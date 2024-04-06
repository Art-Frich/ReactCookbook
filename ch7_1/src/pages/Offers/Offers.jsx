import React from 'react';
import useOffers from './useOffers';

const Offers = () => {
  const {data: offers} = useOffers();

  return (
    <div>
      <h1>Offers</h1>
      <main>
        <ul>
          {offers && offers.map((offer) => <li className='offer'>{offer}</li>)}
        </ul>
      </main>
    </div>
  );
};

export default Offers;