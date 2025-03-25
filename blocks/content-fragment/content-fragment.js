function getMetadata(name) {
    const attr = name && name.includes(':') ? 'property' : 'name';
    const meta = [...document.querySelectorAll(`meta[${attr}="${name}"]`)]
      .map((m) => m.content)
      .join(', ');
    return meta || '';
  }
  
  //const aem = "http://localhost:4503";
  //const aem = "https://publish-p107058-e1001010.adobeaemcloud.com";
  //const aem = "https://publish-p135360-e1341441.adobeaemcloud.com/";
const aem = "https://publish-p150634-e1553296.adobeaemcloud.com";
  
  export default function decorate(block) {
  
    const slugID = document.createElement('div');
    slugID.id = 'slug';
    slugID.textContent = block.querySelector('div:nth-child(1)').textContent.trim();
    block.querySelector('div:nth-child(1)').replaceWith(slugID);
  
    const destinationDiv = document.createElement('div');
    destinationDiv.id = `destination-${slugID.textContent}`;
    block.querySelector('div:last-of-type').replaceWith(destinationDiv);
  
    fetch(`${aem}/graphql/execute.json/nationwide/offer-by-slug;slug=${slugID.textContent}`)
      .then(response => response.json())
      .then(response => {
        const { bannerImage } = response.data.travelDestinationList.items[0];
        const imageURL = `${aem}${primaryImage._dynamicUrl}`;
  
        destinationDiv.innerHTML = `
          <div class='destination-image'>
            <img src="${imageURL}" alt="offer"}">
          </div>
          <div class='destination-content'>
            <div class='destination-content-title'><h3>Test</h3></div>
            <div class='destination-content-subtitle'><h4>Test</h4></div>
            <div class='destination-content-description'><p>test</p></div>
          </div>
        `;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  
  }