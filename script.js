import {format, addMonths, getUnixTime, fromUnixTime, subMonths, startOfMonth, startOfWeek, endOfMonth, endOfWeek, addDays, eachDayOfInterval, isSameMonth, isSameDay} from 'date-fns'
import { formatDurationWithOptions } from 'date-fns/fp'

const pickerButton = document.querySelector('.date-picker-button')
const card = document.querySelector('.date-picker')
const cardHeader = document.querySelector('.current-month')
const nextMonthButton = document.querySelector('.next-month-button')
const previousMonthButton = document.querySelector('.prev-month-button')
const dateButtons = document.querySelectorAll('.date')
const dateGrid = document.querySelector('.date-picker-grid-dates')
let currentDate = new Date()



pickerButton.addEventListener('click',  () => {
    card.classList.toggle('show');
    let selectedDate = fromUnixTime(cardHeader.dataset.selected)
    currentDate = selectedDate
    setUpCard(selectedDate)
})


function setDate(currentDate){
    pickerButton.innerText = format(currentDate, 'MMMM do, yyyy')
    cardHeader.dataset.selected = getUnixTime(currentDate)
}

function setUpCard(selectedDate){
    cardHeader.innerText = format(currentDate, 'MMMM yyyy')
    dateGrid.querySelectorAll('*').forEach(n => n.remove())
    setupDates(selectedDate)
}

function setupDates(selectedDate) {
    const firstWeekStart = startOfWeek(startOfMonth(currentDate))
    const lastWeekStart = endOfWeek(endOfMonth(currentDate))

    const inBetweenDates = eachDayOfInterval({
        start: firstWeekStart,
        end: lastWeekStart
    })
    inBetweenDates.forEach(date => {
    
        const dateButton = document.createElement('button');
        dateButton.classList.add('date')
        dateButton.innerText = format(date, "d")
        if(!isSameMonth(date, currentDate)) {
            dateButton.classList.add('date-picker-other-month-date');
        }

        if(isSameDay(date, selectedDate)){
            console.log(selectedDate)
            dateButton.classList.add('selected')
        }

        dateButton.addEventListener('click', () => {
            setDate(date);
            card.classList.remove('show')
        })
        
        dateGrid.appendChild(dateButton)
    })
}

nextMonthButton.addEventListener('click', () => {
    let selectedDate = fromUnixTime(cardHeader.dataset.selected)
   currentDate = addMonths(currentDate, 1)
   setUpCard(selectedDate);
})
previousMonthButton.addEventListener('click', () => {
    let selectedDate = fromUnixTime(cardHeader.dataset.selected)
    currentDate = subMonths(currentDate, 1)
    setUpCard(selectedDate);
 })



 setDate(currentDate)
