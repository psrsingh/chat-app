import './App.css'
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignOutButton
} from '@clerk/clerk-react'

function App() {
  return (
    <div className="page">

      {/* LEFT SIDE */}
      <div className="left">
        <h1>Chat App 💬</h1>
        <p>Simple. Secure. Fast messaging.</p>
      </div>

      {/* RIGHT SIDE */}
      <div className="right">

        {/* NOT LOGGED IN */}
        <SignedOut>
          <div className="card">
            <h2>Welcome</h2>
            <p>Sign in to continue</p>

            <SignIn 
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "bg-transparent shadow-none border-none",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  socialButtonsBlockButton: "bg-[#1f2c33] text-white border-none",
                  formButtonPrimary: "bg-[#00a884] hover:bg-[#019874] text-white",
                  footerActionLink: "text-[#00a884]"
                }
              }}
            />
          </div>
        </SignedOut>

        {/* LOGGED IN */}
        <SignedIn>
          <div className="logged">
            <h2>You are logged in ✅</h2>

            <SignOutButton>
              <button className="logout-btn">
                Logout
              </button>
            </SignOutButton>
          </div>
        </SignedIn>

      </div>
    </div>
  )
}

export default App