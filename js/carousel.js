

  const apiUrl = "https://www.nordicelegance.no/wp-json/wp/v2/posts?_embed&per_page=100";
  const carousel = document.querySelector(".carousel");
  const carouselNav = document.querySelector(".carouselNav");
  const latestPosts = document.querySelector(".latestPosts");
  const trendingPosts = document.querySelector(".trendingPosts");
  const carouselTitle = document.querySelector(".carouselTitle");

  const navButtons = [];


fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    let slideIndex = 0;

    data.forEach((post) => {
      const carouselDiv = document.createElement("div");
      const carouselImg = document.createElement("img");
      carouselImg.src = post._embedded["wp:featuredmedia"][0].source_url;
      carousel.appendChild(carouselImg);
      carouselImg.alt = post.title.rendered;
      carouselImg.id = "slide-" + (slideIndex + 1);

      const carouselButton = document.createElement("a");
      carouselNav.appendChild(carouselButton);
      carouselButton.href = "#slide-" + (slideIndex + 1);

      const latestPostsDiv = document.createElement("div");
      latestPostsDiv.classList.add("postContainer", "box-shadow");
      latestPosts.appendChild(latestPostsDiv);
      const latestPostsDivImage = document.createElement("img");
      latestPostsDivImage.src = post._embedded["wp:featuredmedia"][0].source_url;
      latestPostsDivImage.alt = post.title.rendered;
      latestPostsDiv.appendChild(latestPostsDivImage);
      const latestPostsDivTitle = document.createElement("h2");
      latestPostsDiv.appendChild(latestPostsDivTitle);
      latestPostsDivTitle.textContent = post.title.rendered;

      const updateSlide = () => {
        currentSlideIndex = slideIndex;
        carousel.querySelector(`#slide-${currentSlideIndex + 1}`).scrollIntoView();
        updateTitle();
      };
      carouselButton.addEventListener('click', (event) => {
        event.preventDefault();
        updateSlide();
      });
      
      carouselImg.addEventListener("click", imgIDtoURL);
      latestPostsDivImage.addEventListener("click", imgIDtoURL);
      let queryString = 'post='+post.id;


      function imgIDtoURL() {
        let updatedUrl = 'specificpost.html' + '?' + queryString;
        window.location.href = updatedUrl;
      }
      


      navButtons.push(carouselButton);
      slideIndex++;
    });


    const leftArrow = document.getElementById('leftarrow');
    const rightArrow = document.getElementById('rightarrow');

    let currentSlideIndex = 0;

    const titlesArray = data.map((post) => post.title.rendered);
    function updateTitle() {
      carouselTitle.innerHTML = titlesArray[currentSlideIndex];
    }
    updateTitle();

    leftArrow.addEventListener('click', function(event) {
      event.preventDefault();
      currentSlideIndex = (currentSlideIndex - 1 + data.length) % data.length;
      carousel.querySelector(`#slide-${currentSlideIndex + 1}`).scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'start' });
      updateTitle();
    });
    
    rightArrow.addEventListener('click', function(event) {
      event.preventDefault();
      currentSlideIndex = (currentSlideIndex + 1) % data.length;
      carousel.querySelector(`#slide-${currentSlideIndex + 1}`).scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'start' });
      updateTitle();
    });

    document.addEventListener('keydown', function(event) {
      if (event.key === 'ArrowLeft') {
        leftArrow.click();
      } else if (event.key === 'ArrowRight') {
        rightArrow.click();
      }
    });
    

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    shuffleArray(data);
    const randomSelection = data.slice(0,4);

    randomSelection.forEach((randomPost) => {
      const bottomSection = document.querySelector(".bottom-section");
      const bottomSectionDiv = document.createElement("div");
      bottomSection.appendChild(bottomSectionDiv);
      bottomSectionDiv.classList.add("bottomSectionDiv", "box-shadow");


      const BottomSectionImage = document.createElement("img");
      bottomSectionDiv.appendChild(BottomSectionImage);
      BottomSectionImage.alt = randomPost.title.rendered;
      BottomSectionImage.src = randomPost._embedded["wp:featuredmedia"][0].source_url

      let queryString = 'post='+randomPost.id;
      BottomSectionImage.addEventListener("click", imgIDtoURL);

      const bottomSectionTitle = document.createElement("h1");
      bottomSectionDiv.appendChild(bottomSectionTitle);
      bottomSectionTitle.textContent = randomPost.title.rendered;

      BottomSectionImage.addEventListener("click", imgIDtoURL);

      function imgIDtoURL() {
        let updatedUrl = 'specificpost.html' + '?' + queryString;
        window.location.href = updatedUrl;
      }
    })

    



  });