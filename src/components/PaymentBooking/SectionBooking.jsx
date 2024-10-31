export const Section = ({ title, children }) => {
    return (
      <div className="block justify-end w-full h-auto mb-10">
        <h3 className="font-prompt font-bold text-[#AD957B] text-3xl mb-10">{title}</h3>
        {children}
      </div>
    );
  };

