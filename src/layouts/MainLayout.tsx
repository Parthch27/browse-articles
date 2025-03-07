
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  
  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Enable animations for elements as they scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((element) => {
      observer.observe(element);
    });

    return () => {
      document.querySelectorAll(".animate-on-scroll").forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="flex flex-1 pt-16">
        <Sidebar />
        <main className="flex-grow max-w-3xl p-0">{children}</main>
        <div className="hidden lg:block w-64 p-4 shrink-0">
          <div className="sticky top-20">
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Stay Updated</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Subscribe to our newsletter to get the latest articles directly to your inbox.
              </p>
              <div className="mb-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-3 py-2 text-sm border border-border rounded-md"
                />
              </div>
              <button className="w-full bg-primary text-white py-2 rounded-md text-sm font-medium">
                Subscribe
              </button>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Popular Threads</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="text-sm">
                    <a href="#" className="font-medium hover:text-primary transition-colors">
                      Artificial Intelligence in Everyday Life
                    </a>
                    <p className="text-xs text-muted-foreground mt-1">
                      December 15, 2023
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Removed Footer from here */}
      <div className="fixed bottom-0 left-0 z-10 w-full md:w-auto">
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
