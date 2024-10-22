import styles from '../styles/T&C.module.css';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy of PINTS',
};

export default function PrivacyPage() {
  return (
    <div className={styles.scrollableContent}>
      <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto', color: '#333' }}>
        <h1>Privacy Policy</h1>

        <p><b>Last updated: 22 October 2024</b></p>

        <p>
          At PINTS, we value your privacy and are committed to protecting your personal data. This Privacy Policy outlines how we collect, use, and share your information when you use our website, pints.jack-robertson.co.uk, and any associated services.
        </p>

        <h2>1. Information We Collect</h2>
        <ul>
          <li><b>Personal Information:</b> When you sign up or interact with our service, we may collect personal data such as your name, email address, and any other information you provide.</li>
          <li><b>Usage Data:</b> We automatically collect data about your interaction with the site, such as your IP address, browser type, and pages viewed.</li>
          <li><b>Cookies:</b> We use cookies and similar tracking technologies to enhance user experience and gather analytics.</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use your data for various purposes, including:</p>
        <ul>
          <li>To provide and maintain our service</li>
          <li>To communicate with you, including responding to your inquiries</li>
          <li>To improve the functionality and user experience of the website</li>
          <li>For security purposes and to detect potential fraud or abuse</li>
        </ul>

        <h2>3. Data Sharing</h2>
        <p>We do not sell or rent your personal data to third parties. However, we may share your data:</p>
        <ul>
          <li>With service providers who assist in running our website and business</li>
          <li>To comply with legal obligations, enforce our Terms, or protect our rights</li>
        </ul>

        <h2>4. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Request correction of your personal data if it’s inaccurate</li>
          <li>Request deletion of your personal data in certain circumstances</li>
        </ul>

        <h2>5. Security</h2>
        <p>
          We take reasonable measures to secure your personal data from loss, theft, and unauthorized access. However, no internet transmission is completely secure.
        </p>

        <h2>6. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be posted on this page, and we encourage you to review it periodically.
        </p>

        <p>If you have any questions or concerns about this Privacy Policy, please contact us at jack@ya-ya.co.uk.</p>
      </div>
    </div>
  );
}