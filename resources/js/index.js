async function init() {
    let arr=new Array();
    for(let element of magazines){
        try{
            let res=await fetch("https://api.rss2json.com/v1/api.json?rss_url="+element);
            let data=await res.json();
            //console.log(data);
            arr.push(data);
        }catch(err){
            console.log(err);
        }
    };
    console.log(arr);
    
    if(arr && arr.length > 0){
        let accordionList=document.getElementById("accordionExample");
        arr.forEach((e,index)=>{
            let accordItem=document.createElement("div");
            accordItem.className="accordion-item border-0 mb-2";
            let pTag=document.createElement("div");
            pTag.className="accordion-header";
            pTag.setAttribute("id","heading"+index);
            let buttonTag=document.createElement("button");
            buttonTag.className=`accordion-button btn-accordian-s bg-transparent collapsed ${index===0?"collapsed":""}`;
            buttonTag.type="button";
            buttonTag.setAttribute("data-bs-toggle","collapse");
            buttonTag.setAttribute("data-bs-target","#collapse"+index);
            buttonTag.setAttribute("aria-expanded","true");
            buttonTag.setAttribute("aria-controls","collapse"+index);
            buttonTag.innerHTML=`<span class="chevron"></span>
            <span class="fs-6 text-muted fw-light">${e.feed.title}</span>`
            pTag.append(buttonTag);
            accordItem.append(pTag);
            let divTag=document.createElement("div");
            divTag.id="collapse"+index;
            divTag.className=`accordion-collapse collapse ${index===0?"show":""}`;
            divTag.setAttribute("aria-labelledby","heading"+index);
            divTag.setAttribute("data-bs-parent","#accordionExample");
            let BodyTag=document.createElement("div");
            BodyTag.id="body-"+index;
            //BodyTag.textContent=e.feed.description;
            divTag.append(BodyTag);
            accordItem.append(divTag);
            accordionList.append(accordItem);
        });
        //console.log(document.getElementById("body-0"));
        //now carousel
        
        arr.forEach((e,index)=>{
            let carouselId = "carousel-" + index;
            let carouselList=document.createElement("div");
            carouselList.setAttribute("id",carouselId);
            carouselList.className = "carousel slide";
            carouselList.setAttribute("data-bs-wrap", "false"); 
            carouselList.setAttribute("data-bs-interval", "false");
            //carouselList.setAttribute("data-bs-ride","carousel");
            let carouselInner=document.createElement("div");
            carouselInner.className="carousel-inner";
            e.items.forEach((item,i)=>{
                let carouselItem = document.createElement("div");
                carouselItem.className = `carousel-item ${i === 0 ? "active" : ""}`;
                
                let date = new Date(item.pubDate);
                let formatted = date.toLocaleDateString('en-IN');

                carouselItem.innerHTML = `
                <div class="news-wrapper mx-auto"> 
                <a href="${item.link}" target="_blank">
                    <img src="${item.enclosure.link}" class="d-block w-100 news-img" alt="...">
                </a>
                <div class="news-content-body py-3 px-2">
                    <h3 class="carousel-item-heading">${item.title}</h3>
                    <h6 class="carousel-item-author text-muted">
                        ${item.author} <span class="mx-1">•</span> ${formatted}
                    </h6>
                    <p class="corusel-item-description">${item.description}</p>
                </div>
            </div>`;
                carouselInner.append(carouselItem);
                // let carouselItem=document.createElement("div");
                // carouselItem.className=`carousel-item ${i===0?"active":""} w-100`;
                // let aTag=document.createElement("a");
                // aTag.href=item.link;
                // aTag.target="_blank";
                // aTag.innerHTML=`<img src="${item.enclosure.link}" class="d-block w-100" alt="${item.author}"></a>`
                // let headingT=document.createElement("div");
                // headingT.className="";
                // let date=new Date(item.pubDate);
                // let formatted=date.toLocaleDateString('en-IN');
                // headingT.innerHTML=`<h3 class="carousel-item-heading">${item.title}</h3>
                // <h6 class="carousel-item-author">${item.author} <span class="p-1">.</span> ${formatted}</h6>`
                // let descriptionTag=document.createElement("p");
                // descriptionTag.className="corusel-item-description";
                // descriptionTag.textContent=item.description;
                // carouselItem.append(aTag);
                // carouselItem.append(headingT);
                // carouselItem.append(descriptionTag);
                // carouselInner.append(carouselItem);
    
            });
            carouselList.append(carouselInner);

            // Add Buttons with UNIQUE ID targets
            carouselList.innerHTML += `
                    <button class="carousel-control-prev " type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    </button>
                    <button class="carousel-control-next " type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    </button>`;

            document.getElementById("body-" + index).append(carouselList);
        //    carouselList.append(carouselInner);
        //    carouselList.innerHTML=carouselList.innerHTML+`<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        //         <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        //         <span class="visually-hidden">Previous</span>
        //     </button>
        //     <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        //         <span class="carousel-control-next-icon" aria-hidden="true"></span>
        //         <span class="visually-hidden">Next</span>
        //     </button>`;
        //     document.getElementById("body-"+index).append(carouselList);
        })
        
       

        }


    
};
init();