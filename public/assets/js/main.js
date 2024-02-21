const key = 'DEMO_KEY';
const dateInput = document.getElementById('date-input');
const apodImage = document.getElementById('apod-image');
let largeImageUrl;
document.getElementById('date-input').value = getCurrentDate();
document.getElementById('date-input').max = getCurrentDate();

async function fetchApod(date) {
    try {
      const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${key}&thumbs=true&date=${date}`);
      const data = await response.json();
      console.log(data);

      document.getElementById('apod-title').textContent = data.title;
      // document.getElementById('apod-date').textContent = data.date;
      document.getElementById('apod-explanation').textContent = data.explanation;

      console.log(data.media_type);
      if (data.media_type === 'image') {
        apodImage.style.backgroundImage = `url(${data.url})`;
        largeImageUrl = data.hdurl;
      } else {
        apodImage.style.backgroundImage = `url(${data.thumbnail_url})`;
        largeImageUrl = data.url;
      }
      console.log(largeImageUrl);

      apodImage.style.backgroundSize = 'cover';
      apodImage.style.backgroundPosition = 'center';

      apodImage.addEventListener('mouseover', function() {
        const zoomIcon = document.getElementById('zoom-icon');
        zoomIcon.style.display = 'block';
      });
      
      apodImage.addEventListener('mouseout', function() {
        const zoomIcon = document.getElementById('zoom-icon');
        zoomIcon.style.display = 'none';
      });
      
      apodImage.addEventListener('click', function() {
        window.open(largeImageUrl, '_blank');
      });
      
    } catch (error) {
      console.error('Error fetching APOD:', error);
    }
}

// Fetch APOD for today by default
fetchApod(getCurrentDate());


dateInput.addEventListener('change', function() {
  var selectedDate = dateInput.value;
  fetchApod(selectedDate);
  this.blur();
});

function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

