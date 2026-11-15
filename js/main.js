// ISPSC Discover - main interactive features.
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".site-nav");

  // Add a shadow to the navigation after the visitor scrolls.
  window.addEventListener("scroll", () => {
    navbar?.classList.toggle("scrolled", window.scrollY > 30);
  });

  // Close the mobile navigation after a section link is selected.
  document.querySelectorAll("#mainNav .nav-link, #mainNav .btn").forEach(link => {
    link.addEventListener("click", () => {
      const navCollapse = document.getElementById("mainNav");
      if (navCollapse?.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
      }
    });
  });

  // Update the active navigation link based on the visible section.
  const sections = document.querySelectorAll("main section[id], main header[id]");
  const navLinks = document.querySelectorAll("#mainNav .nav-link");
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach(section => sectionObserver.observe(section));

  // Open campus gallery photos in a Bootstrap modal.
  const galleryModalElement = document.getElementById("galleryModal");
  const galleryModal = galleryModalElement ? new bootstrap.Modal(galleryModalElement) : null;
  document.querySelectorAll(".gallery-item").forEach(item => {
    item.addEventListener("click", () => {
      const image = document.getElementById("galleryModalImage");
      const caption = document.getElementById("galleryModalCaption");
      image.src = item.dataset.image;
      image.alt = item.dataset.caption || "Campus gallery image";
      caption.textContent = item.dataset.caption || "";
      galleryModal?.show();
    });
  });

  // Validate and save demo admission inquiries in this browser.
  const inquiryForm = document.getElementById("inquiryForm");
  inquiryForm?.addEventListener("submit", event => {
    event.preventDefault();

    const feedback = document.getElementById("formFeedback");
    const formData = new FormData(inquiryForm);
    const inquiry = {
      id: Date.now(),
      fullName: String(formData.get("fullName") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      interest: String(formData.get("interest") || ""),
      inquiryType: String(formData.get("inquiryType") || ""),
      message: String(formData.get("message") || "").trim(),
      submittedAt: new Date().toLocaleString()
    };

    if (!inquiry.fullName || !inquiry.email || !inquiry.interest || !inquiry.message) {
      showFeedback("Please complete all required fields.", "error");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email)) {
      showFeedback("Please enter a valid email address.", "error");
      return;
    }

    try {
      const savedInquiries = JSON.parse(localStorage.getItem("ispscInquiries") || "[]");
      savedInquiries.push(inquiry);
      localStorage.setItem("ispscInquiries", JSON.stringify(savedInquiries));
      showFeedback("Thank you! Your demo inquiry has been saved in this browser. This is not an official application.", "success");
      inquiryForm.reset();
    } catch (error) {
      showFeedback("Your browser could not save this inquiry. Please check your storage settings.", "error");
    }
  });

  function showFeedback(message, type) {
    const feedback = document.getElementById("formFeedback");
    feedback.textContent = message;
    feedback.className = `form-feedback ${type}`;
  }
});
