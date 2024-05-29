import React from 'react';
import Image from 'next/image';

interface CryptoCardProps {
    name: string;
    price: string;
    change: string;
    icon: string;
    changeColor: string;
}

const CryptoCard = ({ name, price, change, icon, changeColor }: CryptoCardProps) => {
  return (
    <div className="flex justify-between items-center py-2 border-b ">
      <div className="flex items-center">
{/*         <Image src={icon} alt={`${name} icon`} className="w-6 h-6 mr-2" width={200} height={200} />
 */}        <span className="">{name}</span>
      </div>
      <div className="">${price}</div>
      <div className={`text-${changeColor}`}>{change}</div>
    </div>
  );
};

export default CryptoCard;