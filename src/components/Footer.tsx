
import { Link } from "react-router-dom";
import { categories } from "@/data/articles";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border/40 mt-20">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-start items-start">
          <div className="mb-6 md:mb-0 md:mr-12">
            <Link to="/" className="text-2xl font-semibold tracking-tight">
              Arthive
            </Link>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xs">
              Discover thoughtfully curated articles on technology, design, 
              business, and culture to inspire and inform your perspective.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:ml-auto">
            <div>
              <h4 className="font-medium mb-3 text-sm">Explore</h4>
              <ul className="space-y-2 text-xs">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link 
                      to={`/category/${category.slug}`}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3 text-sm">Company</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3 text-sm">Connect</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a 
                    href="#" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-border/40 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Arthive. All rights reserved.
          </p>
          
          <div className="flex space-x-4 mt-4 md:mt-0 text-xs">
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
