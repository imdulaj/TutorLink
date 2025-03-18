import React from 'react';
import '../../pages/Materials/Materials.css';

const materials = [
  {
    id: 1,
    title: 'Introduction to Pure maths',
    type: 'video',
    //url: ,
    //thumbnail: ,
    duration: '10:30'
  },
  {
    id: 2,
    title: 'physics practicals',
    type: 'pdf',
    //url: ,
    //thumbnail: ,
    size: '2.5 MB'
  },
  {
    id: 3,
    title: 'marketing life cycle',
    type: 'video',
    //url: ,
    //thumbnail: ,
    duration: '15:45'
  }
];

function MaterialCard({ material }) {
  return (
    <div className="material-card">
      <img src={material.thumbnail} alt={material.title} className="material-thumbnail" />
      <div className="material-info">
        <h3>{material.title}</h3>
        <div className="material-meta">
          <span className={`material-type ${material.type}`}>
            {material.type.toUpperCase()}
          </span>
          {material.duration && <span>{material.duration}</span>}
          {material.size && <span>{material.size}</span>}
        </div>
      </div>
    </div>
  );
}

export function Materials() {
  return (
    <div className="materials-container">
      <h1>Learning Materials</h1>
      <div className="materials-filters">
        <button className="filter-btn active">All</button>
        <button className="filter-btn">Videos</button>
        <button className="filter-btn">PDFs</button>
      </div>
      <div className="materials-grid">
        {materials.map(material => (
          <MaterialCard key={material.id} material={material} />
        ))}
      </div>
    </div>
  );
}

