// import React, { useState } from 'react';
// import './itemForm.css';

// function ItemForm() {
//   const [itemName, setItemName] = useState('');
//   const [itemType, setItemType] = useState('');
//   const [locationName, setLocationName] = useState('');
//   const [level, setLevel] = useState('');
//   const [time, setTime] = useState('');
//   const [worldTier, setWorldTier] = useState('');

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // handle form submission here
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label htmlFor="item-name" className="form-label">Item Name:</label>
//       <input type="text" id="item-name" value={itemName} onChange={(event) => setItemName(event.target.value)} /><br />

//       <label htmlFor="item-type" className="form-label">Item Type:</label>
//       <input type="text" id="item-type" value={itemType} onChange={(event) => setItemType(event.target.value)} /><br />

//       <label htmlFor="location-name" className="form-label">Location Name:</label>
//       <input type="text" id="location-name" value={locationName} onChange={(event) => setLocationName(event.target.value)} /><br />

//       <label htmlFor="level" className="form-label">Level:</label>
//       <input type="text" id="level" value={level} onChange={(event) => setLevel(event.target.value)} /><br />

//       <label htmlFor="time" className="form-label">Time (24h format):</label>
//       <input type="text" id="time" value={time} onChange={(event) => setTime(event.target.value)} /><br />

//       <label htmlFor="world-tier" className="form-label">World Tier:</label>
//       <input type="text" id="world-tier" value={worldTier} onChange={(event) => setWorldTier(event.target.value)} /><br />

//       <div className="submit-container">
//         <input type="submit" value="Submit" />
//       </div>
//     </form>
//   );
// }

// export default ItemForm;