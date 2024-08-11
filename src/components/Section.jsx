const Section = ({name, container, children}) => {
    return <section className={name}>{container ? <div className="container">{children}</div> : <>{children}</>}</section>;
};

export default Section;
