const Card = ({ children, className = '', title, subtitle, icon, noPadding = false }) => {
  return (
    <div
      className={`glass-card rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
        noPadding ? '' : 'p-6'
      } ${className}`}
    >
      {(title || icon) && (
        <div className={`flex items-center gap-3 mb-4 ${noPadding ? 'px-6 pt-6' : ''}`}>
          {icon && (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-primary dark:text-accent">
              {icon}
            </div>
          )}
          <div>
            {title && (
              <h3 className="text-lg font-semibold text-text dark:text-text-dark">{title}</h3>
            )}
            {subtitle && (
              <p className="text-xs text-text/60 dark:text-text-dark/60">{subtitle}</p>
            )}
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
