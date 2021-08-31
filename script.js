import {format, addMonths, getUnixTime, fromUnixTime, subMonths} from 'date-fns'
import { formatDurationWithOptions } from 'date-fns/fp'

const pickerButton = document.querySelector('.date-picker-button')
const card = document.querySelector('.date-picker')
const cardHeader = document.querySelector('.current-month')
const nextMonthButton = document.querySelector('.next-month-button')
const previousMonthButton = document.querySelector('.prev-month-button')
let currentDate = new Date()


pickerButton.addEventListener('click',  () => {
    card.classList.toggle('show');
    let selectedDate = fromUnixTime(cardHeader.dataset.selected)    
    setUpCard(selectedDate)
})


function setDate(currentDate){
    pickerButton.innerText = format(currentDate, 'MMMM do, yyyy')
    cardHeader.dataset.selected = getUnixTime(currentDate)
}

function setUpCard(currentDate){
    cardHeader.innerText = format(currentDate, 'MMMM yyyy')
    
}

nextMonthButton.addEventListener('click', () => {
   currentDate = addMonths(currentDate, 1)
   setUpCard(currentDate);
   console.log('test')
})
previousMonthButton.addEventListener('click', () => {
    currentDate = subMonths(currentDate, 1)
    console.log('test')
 })

 setDate(currentDate)
console.log('test')