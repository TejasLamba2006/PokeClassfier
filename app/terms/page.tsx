import { Sparkles } from "lucide-react";

export default function TermsOfService() {
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
            Terms of Service
          </h1>

          <div className="space-y-8 text-gray-700">
            <section>
              <p className="text-sm text-gray-500 mb-6">
                <strong>Last updated:</strong> June 30, 2025
              </p>

              <p className="text-lg leading-relaxed mb-6">
                Welcome to PokéChat Classifier! These Terms of Service ("Terms")
                govern your access to and use of our AI-powered photo
                personality analysis service. By using our service, you agree to
                be bound by these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                1. Service Description
              </h2>

              <h3 className="text-xl font-medium mb-3 text-gray-800">
                1.1 What We Provide
              </h3>
              <p className="leading-relaxed mb-4">
                PokéChat Classifier is an AI-powered web application that
                analyzes your uploaded photos to determine personality traits
                and matches you with Pokémon characters. Our service includes:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>
                  <strong>Photo Analysis:</strong> AI-powered facial expression
                  and emotion detection using Google Cloud Vision API
                </li>
                <li>
                  <strong>Personality Assessment:</strong> Advanced personality
                  analysis using Google Gemini AI technology
                </li>
                <li>
                  <strong>Pokémon Matching:</strong> Intelligent matching
                  against our database of 930+ Pokémon with detailed personality
                  profiles
                </li>
                <li>
                  <strong>Results Dashboard:</strong> Comprehensive reports with
                  confidence scores, reasoning, and visual similarities
                </li>
                <li>
                  <strong>User Management:</strong> Account creation, usage
                  tracking, and premium features via Discord OAuth
                </li>
              </ul>

              <h3 className="text-xl font-medium mb-3 text-gray-800">
                1.2 Service Availability
              </h3>
              <p className="leading-relaxed mb-4">
                Our service is provided "as is" and "as available." While we
                strive for 99.9% uptime, we do not guarantee uninterrupted
                access. Scheduled maintenance and updates may temporarily affect
                service availability.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                2. User Accounts and Registration
              </h2>

              <h3 className="text-xl font-medium mb-3 text-gray-800">
                2.1 Account Creation
              </h3>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>
                  <strong>Discord Authentication:</strong> You must have a valid
                  Discord account to use our service
                </li>
                <li>
                  <strong>Age Requirement:</strong> You must be at least 13
                  years old to create an account
                </li>
                <li>
                  <strong>Accurate Information:</strong> You agree to provide
                  accurate and complete information
                </li>
                <li>
                  <strong>Account Security:</strong> You are responsible for
                  maintaining the security of your account
                </li>
              </ul>

              <h3 className="text-xl font-medium mb-3 text-gray-800">
                2.2 User Responsibilities
              </h3>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>
                  <strong>Authorized Use:</strong> Only use the service for its
                  intended purpose of personality analysis
                </li>
                <li>
                  <strong>Account Protection:</strong> Do not share your account
                  credentials with others
                </li>
                <li>
                  <strong>Compliance:</strong> Follow all applicable laws and
                  regulations when using our service
                </li>
                <li>
                  <strong>Respectful Use:</strong> Do not use the service to
                  harass, abuse, or harm others
                </li>
              </ul>

              <h3 className="text-xl font-medium mb-3 text-gray-800">
                2.3 Account Termination
              </h3>
              <p className="leading-relaxed">
                We reserve the right to suspend or terminate accounts that
                violate these Terms, engage in fraudulent activity, or pose
                security risks to our service or other users.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                3. Usage Limits and Fair Use
              </h2>

              <h3 className="text-xl font-medium mb-3 text-gray-800">
                3.1 Free Tier Limitations
              </h3>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>
                  <strong>Daily Limit:</strong> Free users can perform up to 5
                  photo analyses per day
                </li>
                <li>
                  <strong>Photo Limits:</strong> Maximum 5 photos per analysis
                  session
                </li>
                <li>
                  <strong>File Size:</strong> Individual photos must be under
                  10MB
                </li>
                <li>
                  <strong>Supported Formats:</strong> JPEG, PNG, and WebP image
                  formats only
                </li>
              </ul>

              <h3 className="text-xl font-medium mb-3 text-gray-800">
                3.2 Premium Features
              </h3>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>
                  <strong>Unlimited Analyses:</strong> Premium users have no
                  daily analysis limits
                </li>
                <li>
                  <strong>Priority Processing:</strong> Faster analysis
                  processing for premium accounts
                </li>
                <li>
                  <strong>Advanced Features:</strong> Access to beta features
                  and enhanced analysis capabilities
                </li>
                <li>
                  <strong>Historical Data:</strong> Extended access to analysis
                  history and results
                </li>
              </ul>

              <h3 className="text-xl font-medium mb-3 text-gray-800">
                3.3 Prohibited Uses
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Automated Access:</strong> No bots, scrapers, or
                  automated tools without permission
                </li>
                <li>
                  <strong>Rate Limiting Circumvention:</strong> Do not attempt
                  to bypass usage limits or rate limiting
                </li>
                <li>
                  <strong>Inappropriate Content:</strong> No offensive, illegal,
                  or inappropriate images
                </li>
                <li>
                  <strong>Commercial Misuse:</strong> No unauthorized commercial
                  use or resale of our service
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                4. Content and Intellectual Property
              </h2>

              <h3 className="text-xl font-medium mb-3 text-gray-800">
                4.1 Your Content
              </h3>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>
                  <strong>Ownership:</strong> You retain ownership of photos and
                  images you upload
                </li>
                <li>
                  <strong>License Grant:</strong> You grant us a limited license
                  to process your photos for analysis
                </li>
                <li>
                  <strong>Content Rights:</strong> You confirm you have the
                  right to upload and analyze the photos
                </li>
                <li>
                  <strong>Privacy:</strong> Your photos are processed privately
                  and not shared with other users
                </li>
              </ul>

              <h3 className="text-xl font-medium mb-3 text-gray-800">
                4.2 Our Intellectual Property
              </h3>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>
                  <strong>Service Technology:</strong> Our AI algorithms,
                  analysis methods, and software are proprietary
                </li>
                <li>
                  <strong>Pokémon Database:</strong> Our curated Pokémon
                  personality database and matching algorithms
                </li>
                <li>
                  <strong>User Interface:</strong> The design, layout, and user
                  experience of our application
                </li>
                <li>
                  <strong>Trademarks:</strong> PokéChat Classifier name and
                  branding elements
                </li>
              </ul>

              <h3 className="text-xl font-medium mb-3 text-gray-800">
                4.3 Third-Party Content
              </h3>
              <p className="leading-relaxed">
                Pokémon names, characters, and related elements are trademarks
                of Nintendo, Game Freak, and The Pokémon Company. Our service is
                a fan project and is not officially affiliated with or endorsed
                by these companies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                5. Privacy and Data Protection
              </h2>

              <h3 className="text-xl font-medium mb-3 text-gray-800">
                5.1 Data Processing
              </h3>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>
                  <strong>Photo Processing:</strong> Photos are processed
                  temporarily and not permanently stored
                </li>
                <li>
                  <strong>Analysis Results:</strong> AI-generated personality
                  assessments are stored for your access
                </li>
                <li>
                  <strong>Account Data:</strong> User information from Discord
                  OAuth is stored securely
                </li>
                <li>
                  <strong>Usage Analytics:</strong> Service usage data is
                  collected for improvement purposes
                </li>
              </ul>

              <h3 className="text-xl font-medium mb-3 text-gray-800">
                5.2 Third-Party Services
              </h3>
              <p className="leading-relaxed mb-4">
                Our service integrates with Google Cloud Vision API, Google
                Gemini AI, and Discord for authentication. Your data may be
                processed by these services according to their respective
                privacy policies.
              </p>

              <h3 className="text-xl font-medium mb-3 text-gray-800">
                5.3 Privacy Policy
              </h3>
              <p className="leading-relaxed">
                For detailed information about how we collect, use, and protect
                your data, please review our{" "}
                <a href="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                6. Payment Terms (If Applicable)
              </h2>

              <h3 className="text-xl font-medium mb-3 text-gray-800">
                6.1 Premium Subscriptions
              </h3>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>
                  <strong>Payment Processing:</strong> Payments are processed
                  securely through Stripe
                </li>
                <li>
                  <strong>Subscription Billing:</strong> Premium subscriptions
                  are billed monthly or annually
                </li>
                <li>
                  <strong>Auto-Renewal:</strong> Subscriptions automatically
                  renew unless cancelled
                </li>
                <li>
                  <strong>Cancellation:</strong> You may cancel your
                  subscription at any time
                </li>
              </ul>

              <h3 className="text-xl font-medium mb-3 text-gray-800">
                6.2 Refund Policy
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>30-Day Guarantee:</strong> Request a full refund
                  within 30 days of purchase
                </li>
                <li>
                  <strong>Pro-rated Refunds:</strong> Unused premium time may be
                  refunded at our discretion
                </li>
                <li>
                  <strong>Technical Issues:</strong> Refunds available for
                  persistent technical problems
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                7. Disclaimers and Limitations
              </h2>

              <h3 className="text-xl font-medium mb-3 text-gray-800">
                7.1 AI Analysis Disclaimer
              </h3>
              <p className="leading-relaxed mb-4">
                Our personality analysis is powered by artificial intelligence
                and is intended for entertainment purposes. Results are based on
                visual analysis and should not be considered professional
                psychological assessment or advice.
              </p>

              <h3 className="text-xl font-medium mb-3 text-gray-800">
                7.2 Accuracy and Reliability
              </h3>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>
                  <strong>No Guarantees:</strong> We do not guarantee the
                  accuracy of personality analysis results
                </li>
                <li>
                  <strong>Entertainment Purpose:</strong> Results are for fun
                  and entertainment, not professional advice
                </li>
                <li>
                  <strong>Individual Variation:</strong> AI analysis may not
                  capture the full complexity of human personality
                </li>
                <li>
                  <strong>Cultural Bias:</strong> AI models may have inherent
                  biases that affect results
                </li>
              </ul>

              <h3 className="text-xl font-medium mb-3 text-gray-800">
                7.3 Service Limitations
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Technical Dependencies:</strong> Our service relies on
                  third-party AI APIs that may experience downtime
                </li>
                <li>
                  <strong>Processing Time:</strong> Analysis time may vary based
                  on photo complexity and server load
                </li>
                <li>
                  <strong>Feature Availability:</strong> Some features may be
                  limited or unavailable in certain regions
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                8. Liability and Indemnification
              </h2>

              <h3 className="text-xl font-medium mb-3 text-gray-800">
                8.1 Limitation of Liability
              </h3>
              <p className="leading-relaxed mb-4">
                To the maximum extent permitted by law, PokéChat Classifier and
                its developers shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages arising from your
                use of the service.
              </p>

              <h3 className="text-xl font-medium mb-3 text-gray-800">
                8.2 User Indemnification
              </h3>
              <p className="leading-relaxed mb-4">
                You agree to indemnify and hold harmless PokéChat Classifier
                from any claims, damages, or expenses arising from your
                violation of these Terms or misuse of the service.
              </p>

              <h3 className="text-xl font-medium mb-3 text-gray-800">
                8.3 Maximum Liability
              </h3>
              <p className="leading-relaxed">
                Our total liability to you for any damages shall not exceed the
                amount you have paid us in the twelve months preceding the
                claim, or $100, whichever is greater.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                9. Modifications and Updates
              </h2>

              <h3 className="text-xl font-medium mb-3 text-gray-800">
                9.1 Service Updates
              </h3>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>
                  <strong>Feature Improvements:</strong> We regularly update our
                  AI algorithms and add new features
                </li>
                <li>
                  <strong>Security Updates:</strong> Security patches and
                  improvements are applied automatically
                </li>
                <li>
                  <strong>Database Updates:</strong> Our Pokémon database may be
                  expanded or refined over time
                </li>
                <li>
                  <strong>UI Changes:</strong> User interface improvements may
                  be implemented without notice
                </li>
              </ul>

              <h3 className="text-xl font-medium mb-3 text-gray-800">
                9.2 Terms Modifications
              </h3>
              <p className="leading-relaxed mb-4">
                We may update these Terms from time to time. Significant changes
                will be communicated via email or service notifications.
                Continued use after changes indicates acceptance of updated
                Terms.
              </p>

              <h3 className="text-xl font-medium mb-3 text-gray-800">
                9.3 Service Discontinuation
              </h3>
              <p className="leading-relaxed">
                We reserve the right to discontinue or significantly modify the
                service with 30 days' notice. Premium subscribers will receive
                appropriate refunds for unused service time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                10. Dispute Resolution
              </h2>

              <h3 className="text-xl font-medium mb-3 text-gray-800">
                10.1 Informal Resolution
              </h3>
              <p className="leading-relaxed mb-4">
                Before pursuing formal legal action, please contact us to
                resolve any disputes informally. We are committed to working
                with users to address concerns and find mutually acceptable
                solutions.
              </p>

              <h3 className="text-xl font-medium mb-3 text-gray-800">
                10.2 Governing Law
              </h3>
              <p className="leading-relaxed mb-4">
                These Terms are governed by the laws of the jurisdiction where
                the service is operated. Any legal disputes will be resolved in
                the appropriate courts of that jurisdiction.
              </p>

              <h3 className="text-xl font-medium mb-3 text-gray-800">
                10.3 Severability
              </h3>
              <p className="leading-relaxed">
                If any provision of these Terms is found to be unenforceable,
                the remaining provisions will continue in full force and effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                11. Contact Information
              </h2>
              <p className="leading-relaxed mb-4">
                For questions about these Terms, technical support, or general
                inquiries, please contact us:
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
                <p>
                  <strong>Discord Community:</strong>{" "}
                  <a
                    href="https://discord.gg/msEkYDWpXM"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Join our Discord
                  </a>
                </p>
              </div>
            </section>

            <section className="border-t pt-6">
              <p className="text-sm text-gray-500 mb-4">
                <strong>Acknowledgment:</strong> By using PokéChat Classifier,
                you acknowledge that you have read, understood, and agree to be
                bound by these Terms of Service.
              </p>
              <p className="text-sm text-gray-500">
                These Terms are effective as of June 30, 2025, and were last
                updated on June 30, 2025.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
