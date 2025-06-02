import React from 'react';
    import { NavLink, useLocation, useNavigate } from 'react-router-dom';
    import { Home, Search, UploadCloud, LayoutDashboard, Brain, Info, Code2, Award, BookOpen } from 'lucide-react';
    import { motion } from 'framer-motion';
    import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
    import { cn } from '@/lib/utils';

    const NavItem = ({ to, icon: Icon, label, isHashLink = false, onClick }) => {
      const location = useLocation();
      const isActive = isHashLink ? location.pathname === '/' && location.hash === to.substring(1) : location.pathname === to;
      
      return (
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <NavLink
                to={to}
                onClick={onClick}
                className={cn(
                  'p-3 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center text-sm',
                  isActive ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="sr-only">{label}</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{label}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    };
    
    const Header = () => {
      const navigate = useNavigate();
      const location = useLocation();

      const handleHashLinkClick = (e, hash) => {
        e.preventDefault();
        if (location.pathname === '/') {
          const element = document.getElementById(hash.substring(1)); // remove '#'
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        } else {
          navigate('/' + hash);
        }
      };

      return (
        <motion.header 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md shadow-lg"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <Brain className="h-10 w-10 text-primary" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-foreground">
                  HyDE NLP
                </span>
              </NavLink>
              <nav className="flex space-x-1 sm:space-x-2">
                <NavItem to="/" icon={Home} label="Home" onClick={(e) => handleHashLinkClick(e, '#hero')} />
                <NavItem to="/#why-hyde" icon={Info} label="Why HyDE?" isHashLink={true} onClick={(e) => handleHashLinkClick(e, '#why-hyde')} />
                <NavItem to="/#concepts" icon={BookOpen} label="Key Concepts" isHashLink={true} onClick={(e) => handleHashLinkClick(e, '#concepts')} />
                <NavItem to="/search" icon={Search} label="HyDE Search" />
                <NavItem to="/datasets" icon={UploadCloud} label="Manage Datasets" />
                <NavItem to="/dashboard" icon={LayoutDashboard} label="Performance Dashboard" />
                <NavItem to="/#developer" icon={Code2} label="Developer" isHashLink={true} onClick={(e) => handleHashLinkClick(e, '#developer')} />
                <NavItem to="/#credits" icon={Award} label="Credits" isHashLink={true} onClick={(e) => handleHashLinkClick(e, '#credits')} />
              </nav>
            </div>
          </div>
        </motion.header>
      );
    };
    
    export default Header;