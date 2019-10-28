$(document).ready(function(){
     $('.chat-head').on('mousedown',function(e){
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        var target = $(this)[0];
        window.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        window.onmousemove = elementDrag;
        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            var posX = e.pageX-target.offsetLeft;
            var posY = e.pageY-target.offsetTop;
            var chatHead = document.getElementsByClassName('chat-head');
            var cn = chatHead.length;
            var nt = document.getElementsByClassName('notification-badge counter')[0];
            var j = 1;
            if(! target.classList.contains('chat-head-0')){
                document.getElementsByClassName('chat-head-0')[0].classList.remove('chat-head-0');
                 target.setAttribute('class','chat-head chat-head-0');
            }
            for(let i =0;i < cn;i++){
                chatHead[i].style.left=target.offsetLeft-pos1+'px';
                chatHead[i].style.top=target.offsetTop-pos2+'px';
                chatHead[i].style.margin='0px';
                
                if(! chatHead[i].classList.contains('chat-head-0')){
                    chatHead[i].classList.contains('online') ?
                        chatHead[i].setAttribute('class','chat-head online chat-head-'+ j ) :
                        chatHead[i].setAttribute('class','chat-head chat-head-'+ j );
                        chatHead[i].setAttribute('data-tab',j);
                    j++;
                }
            }
            nt.style.left=target.offsetLeft-pos1+'px';
            nt.style.top=target.offsetTop-pos2+'px';
            target.parentNode.setAttribute('class','chat-head-container drag');
            target.parentNode.style.left=target.offsetLeft-pos1+'px';
            target.parentNode.style.top=target.offsetTop-pos2+'px';
            target.setAttribute('data-tab','0');
        }
        function closeDragElement() {
            /* stop moving when mouse button is released:*/
            window.onmouseup =null;
            window.onmousemove = null;
            var chatHead = document.getElementsByClassName('chat-head');
            var cn = chatHead.length;
            // for(let i =0;i < cn;i++){
            //     chatHead[i].style.zIndex = '1040';
            // }
        }
    })
    $('.chat-head').on('dblclick',function(e){
        var target = $(this)[0];
        var chatHead = document.getElementsByClassName('chat-head');
        var cn = chatHead.length;
        var j=1;
        // var chatHistory = document.getElementsByClassName('chat-history')[0];
        var cl = "col-md-12 chat-history mb-2 pt-1 "+'h-'+target.getAttribute('data-tab');
        // chatHistory.setAttribute('class',cl);
        if(! target.classList.contains('chat-head-0')){
            document.getElementsByClassName('chat-head-0')[0].classList.remove('chat-head-0');
             target.setAttribute('class','chat-head chat-head-0');
        }
        if(! target.parentNode.classList.contains('dblclick')){
            for(let i =0;i < cn;i++){
                if(! chatHead[i].classList.contains('chat-head-0')){
                    //for horizontal alignment
                    chatHead[i].style.top=target.offsetTop+((j*48)+j*10)+'px';
                    //for vertical alignment
                    // chatHead[i].style.top=target.offsetTop+((j*48)+j*10)+'px';
                    chatHead[i].setAttribute('data-tab',j);
                    j++;
                }
                
            }
            target.parentNode.setAttribute('class','chat-head-container dblclick');
        }else{
            var nt = document.getElementsByClassName('notification-badge counter')[0];
            for(let i =0;i < cn;i++){
                chatHead[i].style.top=target.offsetTop+'px';
                if(! chatHead[i].classList.contains('chat-head-0')){
                    chatHead[i].classList.contains('online') ?
                        chatHead[i].setAttribute('class','chat-head online chat-head-'+ j ) :
                        chatHead[i].setAttribute('class','chat-head chat-head-'+ j );
                    chatHead[i].setAttribute('data-tab',j);
                    j++;
                }
            }
            target.parentNode.setAttribute('class','chat-head-container');
            nt.style.top=target.offsetTop+'px';
            target.parentNode.style.top=target.offsetTop+'px';

        }
        for(let i =0;i < cn;i++){

                chatHead[i].classList.remove('active');

        }
        target.classList.add('active');
        target.setAttribute('data-tab','0');
        // target.parentNode.style.top=target.offsetTop+'px';
    })
    $('.chat-head').on('click',function(e){
        var target = $(this)[0];
        var chatHead = document.getElementsByClassName('chat-head');
        // var chatHistory = document.getElementsByClassName('chat-history')[0];
        var cn = chatHead.length;
        var tab = Number(target.getAttribute('data-tab'));
        // var cl = "col-md-12 chat-history mb-2 pt-1 "+'h-'+target.getAttribute('data-tab');
        // target.parentNode.setAttribute('class','chat-head-container click');
        for(let i =0;i < cn;i++){

            chatHead[i].classList.remove('active');

        }
        target.classList.add('active');
        if(target.classList.contains('touched')){
            // profileView(target);
        }
        // chatHistory.setAttribute('class',cl);
        // if(target.parentNode.classList.contains('dblclick')){
        //     fullChat(target,tab);
        // }
    })
    $('.profile').on('click',function(e){
        var chatHeadActive = document.getElementsByClassName('chat-head active')[0];
        // profileView(chatHeadActive);
    })
    $('.chat-short-desc').on('click',function(e){
        var target = $(this)[0];
        var tab = Number(target.getAttribute('data-desc-tab'));
        var chatHead = document.getElementsByClassName('chat-head');
        var ln = chatHead.length;
        var chatHeadTarget = target;
        for(let i=0;i < ln;i++){
            if(tab === Number(chatHead[i].getAttribute('data-tab'))){
                chatHeadTarget = chatHead[i];
            }
        }
        fullChat(chatHeadTarget,tab);
    })
    function fullChat(target,tab){
        var chatShortDiv = document.getElementsByClassName('chat-short-desc');
        var proDiv = document.getElementsByClassName('page')[0];
        if(chatShortDiv[tab].offsetHeight !== 58){

            // chatShortDiv[tab].style.marginTop="initial";
            chatShortDiv[tab].style.zIndex="initial";
            target.style.zIndex="initial";
            target.style.marginTop="0px";
            for(let i=0;i < 5;i++ ){
                i === 0 ?
                chatShortDiv[tab].style.marginTop="7px":
                chatShortDiv[tab].style.marginTop="0px";
                chatShortDiv[tab].style.paddingTop="0px";
                chatShortDiv[i].style.height="58px";
                chatShortDiv[i].style.left="0px";
            }
            proDiv.style.left="1200px";
        }else{
            chatShortDiv[tab].style.marginTop=-(tab*58)+"px";
            chatShortDiv[tab].style.paddingTop="68px";
            chatShortDiv[tab].style.zIndex="1046";
            target.style.zIndex="1046";
            target.style.marginTop=-(tab*58)+"px";
            for(let i=0;i < 5;i++ ){

                    i === tab ?
                    chatShortDiv[i].style.height="calc(80% - 58px)" :
                    chatShortDiv[i].style.left="-100%";

            }
            proDiv.style.left="0px";
        }
        console.log(target,tab);
    }
    //profile doggle view
    function profileView(target){
        var proDiv = document.getElementsByClassName('page')[0];
        if(target.parentNode.classList.contains('dblclick')){         
            target.style.opacity="0";
            target.style.boxShadow='unset';
            if(target.classList.contains('touched')){
                target.style.transitionDuration= '400ms';
                target.style.top="-120px";
                target.style.left=target.parentNode.offsetLeft+12+58*target.getAttribute('data-tab')+"px";
                
                target.classList.remove('touched');
                target.style.zIndex="1040";

                setTimeout(function(){
                    target.style.transitionDuration= '400ms';
                    target.style.top=target.parentNode.offsetTop+12+"px";
                    target.style.opacity="1";
                    target.style.position="fixed";
                    // target.style.boxShadow='0.5px 0.5px 5px #3c3c3c';
                },150);
                setTimeout(function(){
                    target.style.boxShadow='0.5px 0.5px 5px #3c3c3c';
                },350);
                proDiv.style.left="1200px";
            }else{
                setTimeout(function(){
                    
                    target.style.top="12px";
                    target.style.boxShadow='0px 0px 0px 1200px #fff';
                },150);
                setTimeout(function(){
                    target.style.position="absolute";
                    target.style.transitionDuration= '400ms';
                    target.style.left="12px";
                    target.style.opacity="1";
                    proDiv.style.left="12px";
                },350);
                target.classList.add('touched');
                target.style.zIndex="1200";
            }
        }
    }
});
