import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { SEO_PAGES } from '../data/seo'

export function TermsPage() {
  useDocumentMeta(SEO_PAGES.terms)

  return (
    <div className="pt-14 sm:pt-16 lg:pt-[6rem]">
      <article className="mx-auto max-w-2xl px-5 py-16 sm:px-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-rbn-white sm:text-4xl">
          Terms &amp; Conditions
        </h1>

        <div className="mt-12 space-y-10 text-sm leading-relaxed text-rbn-muted">
          <section>
            <h2 className="text-base font-semibold text-rbn-fog">1. Introduction</h2>
            <p className="mt-3">
              By accessing or using the services of RedBlackNode, you agree to be bound by these Terms
              &amp; Conditions. If you do not agree, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-rbn-fog">2. Services</h2>
            <p className="mt-3">
              RedBlackNode provides design, development, and automation services including but not limited
              to web development, e-commerce solutions, CRM setups, and workflow automation.
            </p>
            <p className="mt-3">
              All services are provided based on agreed project scope, timelines, and deliverables.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-rbn-fog">3. Project Scope &amp; Changes</h2>
            <p className="mt-3">The scope of work will be defined before the project begins.</p>
            <p className="mt-3">Any additional features or changes requested after approval may:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>impact timelines</li>
              <li>incur additional costs</li>
            </ul>
            <p className="mt-3">We will always communicate this before proceeding.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-rbn-fog">4. Payments</h2>
            <p className="mt-3">Projects typically require an upfront payment before work begins.</p>
            <p className="mt-3">Remaining payment terms will be agreed upon per project.</p>
            <p className="mt-3">Final delivery may be withheld until full payment is completed.</p>
            <p className="mt-3">
              All payments are non-refundable once work has started unless agreed otherwise.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-rbn-fog">5. Timelines</h2>
            <p className="mt-3">Estimated timelines are provided based on project scope.</p>
            <p className="mt-3">Delays may occur due to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>changes in requirements</li>
              <li>delayed feedback or approvals</li>
              <li>third-party dependencies</li>
            </ul>
            <p className="mt-3">We are not responsible for delays caused outside our control.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-rbn-fog">6. Client Responsibilities</h2>
            <p className="mt-3">You agree to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>provide accurate project requirements</li>
              <li>supply necessary content, assets, and access on time</li>
              <li>respond to feedback requests in a timely manner</li>
            </ul>
            <p className="mt-3">Delays in these may affect project delivery.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-rbn-fog">7. Intellectual Property</h2>
            <p className="mt-3">Upon full payment, the final deliverables become the client’s property.</p>
            <p className="mt-3">
              We retain the right to showcase the work in our portfolio unless otherwise agreed.
            </p>
            <p className="mt-3">
              Third-party tools, plugins, or licenses remain subject to their respective terms.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-rbn-fog">8. Revisions &amp; Approvals</h2>
            <p className="mt-3">
              A reasonable number of revisions may be included depending on the project.
            </p>
            <p className="mt-3">
              Once a phase is approved, moving back to previous stages may incur additional cost.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-rbn-fog">9. Third-Party Services</h2>
            <p className="mt-3">
              We may integrate third-party platforms such as Shopify, WordPress, APIs, or automation tools.
            </p>
            <p className="mt-3">We are not responsible for:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>outages</li>
              <li>policy changes</li>
              <li>limitations of these platforms</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-rbn-fog">10. Performance &amp; Results</h2>
            <p className="mt-3">While we build for performance and scalability, we do not guarantee:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>specific business outcomes</li>
              <li>traffic or conversion rates</li>
            </ul>
            <p className="mt-3">Results depend on multiple external factors.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-rbn-fog">11. Maintenance &amp; Support</h2>
            <p className="mt-3">Ongoing support is not included unless agreed separately.</p>
            <p className="mt-3">Post-delivery changes, updates, or fixes may be billed additionally.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-rbn-fog">12. Termination</h2>
            <p className="mt-3">Either party may terminate the project with written notice.</p>
            <p className="mt-3">Work completed up to that point will be billed accordingly.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-rbn-fog">13. Limitation of Liability</h2>
            <p className="mt-3">RedBlackNode is not liable for:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>indirect or consequential damages</li>
              <li>data loss, downtime, or business loss</li>
            </ul>
            <p className="mt-3">Use of our services is at your own risk.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-rbn-fog">14. Confidentiality</h2>
            <p className="mt-3">
              Any sensitive information shared during the project will be kept confidential and not
              disclosed to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-rbn-fog">15. Modifications</h2>
            <p className="mt-3">
              We reserve the right to update these Terms &amp; Conditions at any time. Continued use of our
              services implies acceptance of any changes.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-rbn-fog">16. Contact</h2>
            <p className="mt-3">
              For any questions regarding these Terms, please contact us through the website.
            </p>
          </section>
        </div>
      </article>
    </div>
  )
}
