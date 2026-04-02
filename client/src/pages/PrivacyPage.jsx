import { Link } from 'react-router-dom'

export function PrivacyPage() {
  return (
    <div className="pt-[5.25rem] lg:pt-[5.5rem]">
      <article className="mx-auto max-w-2xl px-5 py-16 sm:px-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-rbn-white sm:text-4xl">
          Privacy Policy
        </h1>

        <div className="mt-12 space-y-10 text-sm leading-relaxed text-rbn-muted">
          <section>
            <h2 className="text-base font-semibold text-rbn-fog">1. Introduction</h2>
            <p className="mt-3">
              At RedBlackNode, we value your privacy and are committed to protecting your personal
              information. This Privacy Policy explains how we collect, use, and safeguard your data when
              you interact with our website or services.
            </p>
            <p className="mt-3">By using our website, you agree to the terms outlined in this policy.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-rbn-fog">2. Information We Collect</h2>
            <p className="mt-3">We may collect the following types of information:</p>

            <h3 className="mt-4 text-sm font-semibold text-rbn-subtle">a. Personal Information</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Business or company details</li>
              <li>Project requirements or messages submitted via forms</li>
            </ul>

            <h3 className="mt-4 text-sm font-semibold text-rbn-subtle">b. Technical Information</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Device type</li>
              <li>Pages visited and time spent</li>
              <li>Referring URLs</li>
            </ul>

            <h3 className="mt-4 text-sm font-semibold text-rbn-subtle">c. Cookies &amp; Tracking Data</h3>
            <p className="mt-2">We may use cookies and similar technologies to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>improve user experience</li>
              <li>analyze website traffic</li>
              <li>understand user behavior</li>
            </ul>
            <p className="mt-3">You can control cookie preferences through your browser settings.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-rbn-fog">3. How We Use Your Information</h2>
            <p className="mt-3">We use your data to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>respond to inquiries and project requests</li>
              <li>communicate regarding services</li>
              <li>deliver and manage projects</li>
              <li>improve website performance and user experience</li>
              <li>send updates or relevant information (only when appropriate)</li>
            </ul>
            <p className="mt-3">We do not sell or rent your personal information to third parties.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-rbn-fog">4. Sharing of Information</h2>
            <p className="mt-3">We may share your information with:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>trusted service providers (hosting, analytics, CRM tools)</li>
              <li>
                third-party platforms (e.g., Shopify, WordPress, automation tools) when required for your
                project
              </li>
            </ul>
            <p className="mt-3">All third parties are expected to handle your data securely.</p>
            <p className="mt-3">We may also disclose information if required by law.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-rbn-fog">5. Data Security</h2>
            <p className="mt-3">We take reasonable measures to protect your data, including:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>secure hosting environments</li>
              <li>controlled access to information</li>
              <li>use of trusted platforms and tools</li>
            </ul>
            <p className="mt-3">
              However, no system is completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-rbn-fog">6. Data Retention</h2>
            <p className="mt-3">We retain your information only as long as necessary to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>fulfill project requirements</li>
              <li>comply with legal obligations</li>
              <li>resolve disputes</li>
            </ul>
            <p className="mt-3">You may request deletion of your data at any time.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-rbn-fog">7. Third-Party Services</h2>
            <p className="mt-3">Our website and services may integrate or link to third-party platforms such as:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Shopify</li>
              <li>WordPress</li>
              <li>CRM systems</li>
              <li>Automation tools (n8n, Zapier, Make)</li>
            </ul>
            <p className="mt-3">
              These platforms have their own privacy policies, and we are not responsible for their
              practices.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-rbn-fog">8. Your Rights</h2>
            <p className="mt-3">Depending on your location, you may have the right to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>access your personal data</li>
              <li>request corrections</li>
              <li>request deletion</li>
              <li>withdraw consent</li>
            </ul>
            <p className="mt-3">
              To exercise these rights, contact us through the website.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-rbn-fog">9. Cookies Policy</h2>
            <p className="mt-3">We use cookies to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>enhance site functionality</li>
              <li>analyze usage patterns</li>
              <li>improve performance</li>
            </ul>
            <p className="mt-3">
              You can disable cookies in your browser settings, though some features may not function
              properly.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-rbn-fog">10. Children’s Privacy</h2>
            <p className="mt-3">Our services are not intended for individuals under the age of 13.</p>
            <p className="mt-3">We do not knowingly collect data from children.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-rbn-fog">11. Changes to This Policy</h2>
            <p className="mt-3">We may update this Privacy Policy from time to time.</p>
            <p className="mt-3">Any changes will be posted on this page with an updated effective date.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-rbn-fog">12. Contact Us</h2>
            <p className="mt-3">
              If you have any questions about this Privacy Policy or how your data is handled, please
              contact us through our{' '}
              <Link to="/contact" className="font-medium text-rbn-accent transition-colors hover:text-rbn-fog">
                contact page
              </Link>
              .
            </p>
          </section>
        </div>
      </article>
    </div>
  )
}
