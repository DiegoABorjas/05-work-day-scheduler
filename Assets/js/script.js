// jQuery function
$(function () {
  var main = document.getElementById('main-container');

  var events = [];
  var today = dayjs();
  const currentHour = today.format('H')

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

  // Add event listener to save button
  main.addEventListener('click', function(event) {

    var element = event.target
    
    // IF the the clicked element is a button proceed.
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

      // Loop through events array and check if duplicate entry is being added. If it is splice it
      for (var i=0; i<events.length; i++) {
        if (events[i].eventId === index) {
          events.splice([i], 1)
        }
      }

      // "Push" object into the events array
      events.push(eventObject)

      // Save to localStorage
      localStorage.setItem('event', JSON.stringify(events))

    }
  })


  // Function to render the events from localStorage
  function renderEvents() {
    // Get stored events from localStorage
    var storedEvents = JSON.parse(localStorage.getItem('event'));
  
    if (storedEvents !== null) {
      events = storedEvents;
    }
    // Loop through events array and add events into their respective location
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
