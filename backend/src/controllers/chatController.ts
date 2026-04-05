import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../middleware/auth";
import Chat from "../models/Chat";
import { Types } from "mongoose";

/**
 * GET ALL CHATS FOR LOGGED-IN USER
 */
export async function getChats(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userObjectId = new Types.ObjectId(userId);

    const chats = await Chat.find({
      participants: userObjectId,
    })
      .populate("participants", "name email avatar")
      .populate("lastMessage")
      .sort({ lastMessageAt: -1 });

    const formattedChats = chats.map((chat: any) => {
      const otherParticipant = chat.participants.find(
        (p: any) => p._id.toString() !== userId.toString()
      );

      return {
        _id: chat._id,
        participant: otherParticipant ?? null,
        lastMessage: chat.lastMessage,
        lastMessageAt: chat.lastMessageAt,
        createdAt: chat.createdAt,
      };
    });

    res.json(formattedChats);
  } catch (error) {
    next(error);
  }
}

/**
 * GET OR CREATE CHAT
 */
export async function getOrCreateChat(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.userId;

    // ✅ fix: ensure participantId is string
    const rawParticipantId = req.params.participantId;
    const participantId = Array.isArray(rawParticipantId)
      ? rawParticipantId[0]
      : rawParticipantId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!participantId) {
      return res
        .status(400)
        .json({ message: "Participant ID is required" });
    }

    if (!Types.ObjectId.isValid(participantId)) {
      return res.status(400).json({ message: "Invalid participant ID" });
    }

    if (userId === participantId) {
      return res
        .status(400)
        .json({ message: "Cannot create chat with yourself" });
    }

    const userObjectId = new Types.ObjectId(userId);
    const participantObjectId = new Types.ObjectId(participantId);

    // ✅ prevent duplicate chats (sorted IDs)
    const participants = [userObjectId, participantObjectId].sort((a, b) =>
      a.toString().localeCompare(b.toString())
    );

    // 🔍 check if chat exists
    let chat = await Chat.findOne({
      participants,
    })
      .populate("participants", "name email avatar")
      .populate("lastMessage");

    // 🆕 create if not exists
    if (!chat) {
      const newChat = new Chat({ participants });
      await newChat.save();

      chat = await newChat.populate([
        { path: "participants", select: "name email avatar" },
        { path: "lastMessage" },
      ]);
    }

    const otherParticipant = (chat as any).participants.find(
      (p: any) => p._id.toString() !== userId.toString()
    );

    res.json({
      _id: chat._id,
      participant: otherParticipant ?? null,
      lastMessage: chat.lastMessage,
      lastMessageAt: chat.lastMessageAt,
      createdAt: chat.createdAt,
    });
  } catch (error) {
    next(error);
  }
}