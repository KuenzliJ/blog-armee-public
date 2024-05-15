"use client";
import { Accordion, AccordionItem } from "@nextui-org/accordion";

const InfoItem = ({ info }: { info: any }) => {
  //define info item
  const { id, description, title, category, url } = info || {};
  return (
    <div className="item">
      <Accordion variant="splitted">
        <AccordionItem key="1" title={title}>
          {description}
          {url && (
            <div className="text-center mt-2">
              <a href={url} className="text-blue-500">Mehr Informationen...</a>
            </div>
          )}
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default InfoItem;
