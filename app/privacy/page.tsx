import { Sparkles } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PokéChat Classifier
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Privacy Policy
          </h1>

          <div className="space-y-8 text-gray-700">
            <section>
              <p className="text-sm text-gray-500 mb-6">
                <strong>Last updated:</strong> June 30, 2025
              </p>

              <p className="text-lg leading-relaxed mb-6">
                At PokéChat Classifier, we are committed to protecting your
                privacy and ensuring the security of your personal information.
                This Privacy Policy explains how we collect, use, store, and
                protect your data when you use our AI-powered photo personality
                analysis service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                1. Information We Collect
              </h2>

              <h3 className="text-xl font-medium mb-3 text-gray-800">
                1.1 Account Information
              </h3>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>
                  <strong>Discord Account Data:</strong> When you sign in via
                  Discord OAuth, we collect your Discord username, email
                  address, profile picture, and unique Discord ID
                </li>
                <li>
                  <strong>User Profile:</strong> Your display name, email
                  address, and profile image from your Discord account
                </li>
                <li>
                  <strong>Account Settings:</strong> Your subscription status
                  (free/premium), usage count, and user role (customer/admin)
                </li>
              </ul>

              <h3 className="text-xl font-medium mb-3 text-gray-800">
                1.2 Photos and Visual Data
              </h3>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>
                  <strong>Uploaded Photos:</strong> Images you voluntarily
                  upload for personality analysis (JPEG, PNG, WebP formats)
                </li>
                <li>
                  <strong>Facial Recognition Data:</strong> Facial expressions,
                  emotions, and visual traits extracted from your photos
                </li>
                <li>
                  <strong>Photo Metadata:</strong> File size, upload timestamp,
                  and image properties
                </li>
                <li>
                  <strong>Analysis Results:</strong> AI-generated personality
                  assessments and Pokémon matches based on your photos
                </li>
              </ul>

              <h3 className="text-xl font-medium mb-3 text-gray-800">
                1.3 Usage Analytics
              </h3>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>
                  <strong>Service Usage:</strong> Number of analyses performed,
                  timestamps, and processing times
                </li>
                <li>
                  <strong>Feature Interaction:</strong> Which features you use
                  and how often
                </li>
                <li>
                  <strong>Error Logs:</strong> Technical logs for
                  troubleshooting and service improvement
                </li>
              </ul>

              <h3 className="text-xl font-medium mb-3 text-gray-800">
                1.4 Technical Information
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Device Information:</strong> Browser type, operating
                  system, and device capabilities
                </li>
                <li>
                  <strong>Network Data:</strong> IP address, connection type,
                  and geographic location (general)
                </li>
                <li>
                  <strong>Session Data:</strong> Login sessions, authentication
                  tokens, and security information
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                2. How We Use Your Information
              </h2>

              <h3 className="text-xl font-medium mb-3 text-gray-800">
                2.1 Core Service Functionality
              </h3>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>
                  <strong>Photo Analysis:</strong> Processing your photos using
                  Google Cloud Vision API and Google Gemini AI to extract
                  personality traits
                </li>
                <li>
                  <strong>Personality Matching:</strong> Comparing your analyzed
                  traits with our 930+ Pokémon database to find your perfect
                  match
                </li>
                <li>
                  <strong>Results Generation:</strong> Creating personalized
                  reports with confidence scores and detailed reasoning
                </li>
                <li>
                  <strong>User Experience:</strong> Providing a personalized
                  interface based on your usage history and preferences
                </li>
              </ul>

              <h3 className="text-xl font-medium mb-3 text-gray-800">
                2.2 Account Management
              </h3>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>
                  <strong>Authentication:</strong> Verifying your identity and
                  maintaining secure login sessions
                </li>
                <li>
                  <strong>Usage Tracking:</strong> Monitoring your analysis
                  count against free tier limits (5 analyses per day)
                </li>
                <li>
                  <strong>Premium Features:</strong> Managing subscription
                  status and unlimited access for premium users
                </li>
                <li>
                  <strong>Admin Functions:</strong> Providing administrative
                  tools for authorized personnel
                </li>
              </ul>

              <h3 className="text-xl font-medium mb-3 text-gray-800">
                2.3 Service Improvement
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Algorithm Enhancement:</strong> Improving our AI
                  matching algorithms using aggregated, anonymized data
                </li>
                <li>
                  <strong>Performance Optimization:</strong> Analyzing usage
                  patterns to optimize service speed and reliability
                </li>
                <li>
                  <strong>Error Resolution:</strong> Identifying and fixing
                  technical issues to improve user experience
                </li>
                <li>
                  <strong>Feature Development:</strong> Understanding user needs
                  to develop new features and improvements
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                3. Third-Party Services
              </h2>

              <p className="mb-4">
                We integrate with several third-party services to provide our
                functionality:
              </p>

              <h3 className="text-xl font-medium mb-3 text-gray-800">
                3.1 Authentication & Social
              </h3>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>
                  <strong>Discord OAuth:</strong> For secure user authentication
                  and profile information
                </li>
                <li>
                  <strong>NextAuth.js:</strong> For session management and
                  security
                </li>
              </ul>

              <h3 className="text-xl font-medium mb-3 text-gray-800">
                3.2 AI & Analysis Services
              </h3>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>
                  <strong>Google Cloud Vision API:</strong> For high-accuracy
                  facial expression and emotion detection
                </li>
                <li>
                  <strong>Google Gemini AI:</strong> For personality analysis
                  and Pokémon matching intelligence
                </li>
                <li>
                  <strong>OCR.space API:</strong> As backup OCR service when
                  needed
                </li>
              </ul>

              <h3 className="text-xl font-medium mb-3 text-gray-800">
                3.3 Infrastructure & Storage
              </h3>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>
                  <strong>PostgreSQL Database:</strong> For secure data storage
                  and user management
                </li>
                <li>
                  <strong>Prisma ORM:</strong> For database operations and data
                  integrity
                </li>
                <li>
                  <strong>Upstash Redis:</strong> For rate limiting and
                  performance optimization
                </li>
              </ul>

              <h3 className="text-xl font-medium mb-3 text-gray-800">
                3.4 Payment Processing
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Stripe:</strong> For secure payment processing and
                  subscription management (when applicable)
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                4. Data Storage and Security
              </h2>

              <h3 className="text-xl font-medium mb-3 text-gray-800">
                4.1 Data Storage
              </h3>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>
                  <strong>Database:</strong> User data is stored in a secure
                  PostgreSQL database with encryption at rest
                </li>
                <li>
                  <strong>Photo Processing:</strong> Uploaded photos are
                  processed temporarily and not permanently stored on our
                  servers
                </li>
                <li>
                  <strong>Analysis Results:</strong> AI analysis results are
                  stored to improve your experience and for historical reference
                </li>
                <li>
                  <strong>Session Data:</strong> Authentication sessions are
                  managed securely with encrypted tokens
                </li>
              </ul>

              <h3 className="text-xl font-medium mb-3 text-gray-800">
                4.2 Security Measures
              </h3>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>
                  <strong>Encryption:</strong> All data transmission is
                  encrypted using HTTPS/TLS protocols
                </li>
                <li>
                  <strong>Authentication:</strong> Secure OAuth2 authentication
                  via Discord with session management
                </li>
                <li>
                  <strong>Access Control:</strong> Role-based access control
                  with customer and admin user levels
                </li>
                <li>
                  <strong>Rate Limiting:</strong> Protection against abuse with
                  usage limits and monitoring
                </li>
              </ul>

              <h3 className="text-xl font-medium mb-3 text-gray-800">
                4.3 Data Retention
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Account Data:</strong> Stored for the duration of your
                  account plus 30 days after deletion
                </li>
                <li>
                  <strong>Analysis Results:</strong> Retained for 1 year to
                  provide historical access and service improvement
                </li>
                <li>
                  <strong>Photos:</strong> Processed immediately and not stored
                  permanently on our servers
                </li>
                <li>
                  <strong>Logs:</strong> Technical logs retained for 90 days for
                  security and debugging purposes
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                5. Your Rights and Choices
              </h2>

              <h3 className="text-xl font-medium mb-3 text-gray-800">
                5.1 Data Access and Control
              </h3>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>
                  <strong>Account Access:</strong> View and manage your account
                  information through the user dashboard
                </li>
                <li>
                  <strong>Analysis History:</strong> Access your past
                  personality analysis results and Pokémon matches
                </li>
                <li>
                  <strong>Data Export:</strong> Request a copy of your data in a
                  portable format
                </li>
                <li>
                  <strong>Account Deletion:</strong> Delete your account and
                  associated data at any time
                </li>
              </ul>

              <h3 className="text-xl font-medium mb-3 text-gray-800">
                5.2 Privacy Controls
              </h3>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>
                  <strong>Photo Privacy:</strong> Your photos are processed
                  privately and not shared with other users
                </li>
                <li>
                  <strong>Result Privacy:</strong> Your personality analysis
                  results are confidential and not public
                </li>
                <li>
                  <strong>Opt-out:</strong> Choose not to participate in service
                  improvement analytics
                </li>
                <li>
                  <strong>Communication:</strong> Control how we communicate
                  with you about service updates
                </li>
              </ul>

              <h3 className="text-xl font-medium mb-3 text-gray-800">
                5.3 Legal Rights (GDPR/CCPA)
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Right to Know:</strong> Request information about what
                  personal data we collect and how it's used
                </li>
                <li>
                  <strong>Right to Delete:</strong> Request deletion of your
                  personal data subject to legal requirements
                </li>
                <li>
                  <strong>Right to Correct:</strong> Request correction of
                  inaccurate personal information
                </li>
                <li>
                  <strong>Right to Portability:</strong> Receive your data in a
                  machine-readable format
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                6. Children's Privacy
              </h2>
              <p className="leading-relaxed mb-4">
                Our service is designed for users aged 13 and older. We do not
                knowingly collect personal information from children under 13.
                If you believe we have collected information from a child under
                13, please contact us immediately, and we will take steps to
                remove such information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                7. International Data Transfers
              </h2>
              <p className="leading-relaxed mb-4">
                Your data may be processed and stored in countries other than
                your own. We ensure appropriate safeguards are in place to
                protect your data in accordance with applicable privacy laws and
                international standards.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                8. Changes to This Policy
              </h2>
              <p className="leading-relaxed mb-4">
                We may update this Privacy Policy from time to time to reflect
                changes in our practices or legal requirements. We will notify
                you of significant changes via email or through our service.
                Continued use of our service after changes indicates acceptance
                of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                9. Contact Information
              </h2>
              <p className="leading-relaxed mb-4">
                If you have questions about this Privacy Policy, need to
                exercise your privacy rights, or have concerns about how your
                data is handled, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p>
                  <strong>Developer:</strong> Tejas Lamba
                </p>
                <p>
                  <strong>Email:</strong> tejas22feb@gmail.com
                </p>
                <p>
                  <strong>LinkedIn:</strong>{" "}
                  <a
                    href="https://linkedin.com/in/tejaslamba"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    linkedin.com/in/tejaslamba
                  </a>
                </p>
                <p>
                  <strong>GitHub:</strong>{" "}
                  <a
                    href="https://github.com/TejasLamba2006/PokeClassfier"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    github.com/TejasLamba2006/PokeClassfier
                  </a>
                </p>
              </div>
            </section>

            <section className="border-t pt-6">
              <p className="text-sm text-gray-500">
                This Privacy Policy is effective as of June 30, 2025, and was
                last updated on June 30, 2025.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
