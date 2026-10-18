import { Container } from "react-bootstrap";
import { faq } from "../data/faq";
import "./FAQ.css";

export const FAQ = () => {
  return (
    <section className="faq-section" id="faq" aria-labelledby="faq-title">
      <Container>
        <h2 className="skills-title" id="faq-title">FAQ</h2>
        <p className="skills-subtitle faq-subtitle">Questions nobody asked</p>

        <div className="faq-list">
          {faq.map((item) => (
            <details key={item.id} className="faq-item">
              <summary>
                <span>{item.question}</span>
                <span className="faq-icon" aria-hidden="true" />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
};
