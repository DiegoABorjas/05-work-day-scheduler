// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var main = document.getElementById('main-container');

  var events = [];
  var today = dayjs();
  const currentHour = today.format('H')
  
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  // Loop starts at 9 and ends at 18, will add a div for each hour block between 9-5
  for (var i = 9; i < 18; i++) {
    var hoursDivEl = document.createElement('div');
    hoursDivEl.setAttribute('id', `hour-${i}`);

    // Set the hour to our loop index of each hour
    var setHour = dayjs().set('hour', i)
    const calendarHourText = setHour.format('h')
    const amOrPm = setHour.format('A')

    // IF i is less than the current hour add a class for past, if equal add a class for present, else add a class for future.
    if (i < currentHour) {
      hoursDivEl.setAttribute('class', 'row time-block past');
    } else if (i == currentHour) {
      hoursDivEl.setAttribute('class', 'row time-block present');
    } else hoursDivEl.setAttribute('class', 'row time-block future');
    
    // Add div element that shows the time for each hour block
    var hourTitleEl = document.createElement('div');
    hourTitleEl.setAttribute('class', 'col-2 col-md-1 hour text-center py-3');
    hourTitleEl.textContent = `${calendarHourText} ${amOrPm}`;

    // Add textarea element to each div hour block
    var textArea = document.createElement('textarea');
    textArea.setAttribute('class', 'col-8 col-md-10 description');
    textArea.setAttribute('rows', 3);

    // Add save button to each textarea block
    var saveButton = document.createElement('button');
    saveButton.setAttribute('class', 'btn saveBtn col-2 col-md-1');
    saveButton.setAttribute('aria-label', 'save')

    // Add icon to each save button
    var buttonIcon = document.createElement('i');
    buttonIcon.setAttribute('class', 'fas fa-save');
    buttonIcon.setAttribute('aria-hidden', 'true');
    buttonIcon.style.pointerEvents = 'none'

    // Append  all dynamically created elements
    hoursDivEl.appendChild(hourTitleEl);
    hoursDivEl.appendChild(textArea);
    hoursDivEl.appendChild(saveButton);
    saveButton.appendChild(buttonIcon);
    main.appendChild(hoursDivEl);
  }

// TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //

  main.addEventListener('click', function(event) {

    var element = event.target
    
    if (element.matches('button')) {
      var id = element.parentElement.getAttribute('id')
      var eventText = element.parentElement.childNodes[1].value.trim();
      if (eventText === '') {
        return
      }

      var eventObject = {
        eventId: id,
        objectEntry: eventText
      }   

      var index = eventObject.eventId
      var entry = eventObject.objectEntry

      for (var i=0; i<events.length; i++) {
        if (events[i].eventId === index) {
          events.splice([i], 1)
        }
      }

      events.push(eventObject)

      localStorage.setItem('event', JSON.stringify(events))

    }
  })


  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //

  function renderEvents() {
    // Get stored events from localStorage
    var storedEvents = JSON.parse(localStorage.getItem('event'));
  
    if (storedEvents !== null) {
      events = storedEvents;
    }

    for (var i=0; i<events.length; i++) {
      var event = events[i]
      var eventArea = document.querySelector(`#${event.eventId}`)

      eventArea.childNodes[1].value = event.objectEntry
            
    }  
    
  }

  // TODO: Add code to display the current date in the header of the page.
  $('#currentDay').text(today.format('dddd, MMMM DD'))

  // Function to render the events stored in localStorage
  renderEvents();
  
});
