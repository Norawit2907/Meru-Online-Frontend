import React from "react";

const timelineItems = [
    {
      date: "22.08.90",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta sint earum ab nihil deleniti molestiae ipsam at magnam corrupti, sapiente aut maxime ipsa quae fugit blanditiis quas soluta mollitia laudantium.",
    },
    {
      date: "22.08.90",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta sint earum ab nihil deleniti molestiae ipsam at magnam corrupti, sapiente aut maxime ipsa quae fugit blanditiis quas soluta mollitia laudantium.",
    },
    {
      date: "22.08.90",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta sint earum ab nihil deleniti molestiae ipsam at magnam corrupti, sapiente aut maxime ipsa quae fugit blanditiis quas soluta mollitia laudantium.",
    },
  ];
  

const Timeline = () => {
    return (
      <section className="h-auto flex justify-center pt-10">
        <div className="w-3/4">
          <ul>
            {timelineItems.map((item, index) => (
              <TimelineItem
                key={index}
                date={item.date}
                content={item.content}
                isLast={index === timelineItems.length - 1} // Add a condition for the last item
              />
            ))}
          </ul>
        </div>
      </section>
    );
  };
  
  const TimelineItem = ({ date, content, isLast }) => {
    return (
      <li className="relative flex gap-6">
        <div className="flex items-center">          <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg">
            <circle r="8" cx="8" cy="8" fill="white" />
          </svg>

          {!isLast && (
            <div className="before:absolute before:left-[7px] before:top-[90px] before:h-full before:w-[2px] before:bg-white" />
          )}
        </div>

        <div className="text-sm text-gray-600 bg-white p-4 m-10">
          <p>{date}</p>
          <p className="mt-2">{content}</p>
        </div>
      </li>
    );
  };
  

export default Timeline