import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import './style.css';
const root = document.getElementById('root')!;
if(root.hasChildNodes()) hydrateRoot(root, <React.StrictMode><App initialNotFound={root.dataset.notFound==='true'}/></React.StrictMode>);
else createRoot(root).render(<React.StrictMode><App initialNotFound={root.dataset.notFound==='true'}/></React.StrictMode>);
