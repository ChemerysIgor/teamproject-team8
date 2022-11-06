import { getCurrentPage } from './getCurrentPage';
// import { modalMovie } from './modal-movie';
import { renderUI } from './renderHomePageUI';
import { onSubmit } from './searchinputLogic';
// Adds a red line under active page in the website header
getCurrentPage();

// UI render invocation
renderUI();


// searchInputLogic

const searchForm = document.querySelector('.search-form');
searchForm.addEventListener('submit', onSubmit);