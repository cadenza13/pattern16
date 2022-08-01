'use strict';

(() =>{
  class User{
    constructor(){
      this.field = document.querySelector('.user');
      this.clearCard = document.querySelector('.user > div');
      this.ids = [];
      this.numbers = [];
      this.cardLength = 0;
      this.numberTotal = 0;
      this.elevenIndex = -1;
    }

    create(id){
      if(this.cardLength === 0){
        this.clearCard.remove();
      }

      const card = document.createElement('img');
      const cardWidth = deck.card.getBoundingClientRect().width;
      const cardHeight = deck.card.getBoundingClientRect().height;
      const containerHeight = container.getBoundingClientRect().height;
      const x = (cardWidth / 2) * this.cardLength;
      const y = (containerHeight - cardHeight) / 2;

      card.src = `img/card${id}.png`;
      this.field.appendChild(card);
      this.cardLength++;
      this.ids.push(id);

      card.style.transform = `translate(-${x}px, -${y}px)`;

      internal.numberGet(id, 'user');

      setTimeout(() =>{
        card.style.transform = 'none';
      }, 100);

      if(this.cardLength <= 2){
        setTimeout(() =>{
          deck.allo('dealer');
        }, 500);
      }

      if(this.cardLength === 2){
        setTimeout(() =>{
          if(this.cardLength === 2 && this.numberTotal === 21 || dealer.cardLength === 2 && dealer.numberTotal === 21){
            dealer.open();
            return;
          }
  
          this.burstCheck();
          dealer.burstCheck();
        }, 2500);
      }

      if(this.cardLength > 2){
        setTimeout(() => {
          this.burstCheck();
        }, 2000);
      }
    }

    numberGet(number){
      this.numbers.push(number);
      this.numberTotal += number;
    }

    burstCheck(){
      if(this.numberTotal > 21){
        this.elevenIndex = this.numbers.indexOf(11);
        if(this.elevenIndex >= 0){
          this.numbers.splice(this.elevenIndex, 1, 1);
          this.numberTotal -= 10;
          this.burstCheck();
          return;
        }
        setTimeout(() =>{
          other.stand();
        }, 100);
        return;
      }

      other.action();
    }
  }

  class Dealer{
    constructor(){
      this.field = document.querySelector('.dealer');
      this.clearCard = document.querySelector('.dealer > div');
      this.ids = [];
      this.numbers = [];
      this.cardLength = 0;
      this.numberTotal = 0;
      this.elevenIndex = -1;
    }

    create(id){
      if(this.cardLength === 0){
        this.clearCard.remove();
      }

      const card = document.createElement('img');
      const cardWidth = deck.card.getBoundingClientRect().width;
      const cardHeight = deck.card.getBoundingClientRect().height;
      const containerHeight = container.getBoundingClientRect().height;
      const x = (cardWidth / 2) * this.cardLength;
      const y = (containerHeight - cardHeight) / 2;

      card.src = 'img/card-inside.png';
      this.field.appendChild(card);
      this.cardLength++;
      this.ids.push(id);

      card.style.transform = `translate(-${x}px, ${y}px)`;

      internal.numberGet(id, 'dealer');

      setTimeout(() =>{
        card.style.transform = 'none';
      }, 100);

      if(this.cardLength < 2){
        setTimeout(() =>{
          deck.allo('user');
        }, 500);
      }

      if(this.cardLength > 2){
        setTimeout(() =>{
          this.burstCheck();
        }, 2000);
      }
    }

    numberGet(number){
      this.numbers.push(number);
      this.numberTotal += number;
    }

    open(){
      const cards = document.querySelectorAll('.dealer > img');
      
      cards.forEach((card, index) =>{
        card.classList.add('open');
        card.style.transform = 'scaleX(0)';
        
        setTimeout(() =>{
          card.src = `img/card${this.ids[index]}.png`;
          card.style.transform = 'none';
        }, 1000);
      });

      setTimeout(() => {
        if(this.cardLength === 2 && this.numberTotal === 21){
          if(user.cardLength === 2 && user.numberTotal === 21){
            other.result('drawBlackJack');
            return;
          }
          other.result('dealerBlackJack');
          return;
        }

        if(user.cardLength === 2 && user.numberTotal === 21){
          other.result('userBlackJack');
          return;
        }

        if(this.numberTotal > 21){
          if(user.numberTotal > 21){
            other.result('drawBurst');
            return;
          }
          other.result('dealerBurst');
          return;
        }

        if(user.numberTotal > 21){
          other.result('userBurst');
          return;
        }

        internal.result();
      }, 3000);
    }

    burstCheck(){
      if(this.numberTotal > 21){
        this.elevenIndex = this.numbers.indexOf(11);
        if(this.elevenIndex >= 0){
          this.numbers.splice(this.elevenIndex, 1, 1);
          this.numberTotal -= 10;
          this.burstCheck();
          return;
        }
      }

      if(this.cardLength > 2){
        if(this.numberTotal >= 17){
          this.open();
        } else {
          deck.allo('dealer');
        }
      }
    }
  }

  class Deck{
    constructor(){
      this.field = document.querySelector('.deck');
      this.card = document.getElementById('card');
      this.ids = [];
      this.total = 52;
      this.redo = false;
    }

    allo(player){
      const id = Math.floor(Math.random() * this.total);

      this.ids.forEach(num =>{
        if(num === id){
          this.redo = true;
        }
      });

      if(this.redo){
        this.redo = false;
        this.allo(player);
        return;
      }

      this.ids.push(id);
      
      if(player === 'user'){
        user.create(id);
      } else {
        dealer.create(id);
      }
    }
  }

  class Internal{
    constructor(){
      this.number = 0;
    }

    numberGet(id, player){
      if(id < 4) this.number = 11;
      else if(id >= 4 && id < 8) this.number = 2;
      else if(id >= 8 && id < 12) this.number = 3;
      else if(id >= 12 && id < 16) this.number = 4;
      else if(id >= 16 && id < 20) this.number = 5;
      else if(id >= 20 && id < 24) this.number = 6;
      else if(id >= 24 && id < 28) this.number = 7;
      else if(id >= 28 && id < 32) this.number = 8;
      else if(id >= 32 && id < 36) this.number = 9;
      else if(id >= 36) this.number = 10;

      if(player === 'user'){
        user.numberGet(this.number);
      } else {
        dealer.numberGet(this.number);
      }
    }

    result(){
      if(user.numberTotal > dealer.numberTotal){
        other.result('winner');
      } else if(user.numberTotal < dealer.numberTotal){
        other.result('lose');
      } else if(user.numberTotal === dealer.numberTotal){
        other.result('draw');
      }
    }
  }

  class Other{
    constructor(){
      this.btns = document.querySelector('.action-btns');
      this.hitBtn = document.getElementById('hit-btn');
      this.standBtn = document.getElementById('stand-btn');
      this.text = document.querySelector('.text');
      this.textP = document.getElementById('text-p');
      this.textBtn = document.getElementById('text-btn');

      this.hitBtn.addEventListener('click', () =>{
        if(user.numberTotal === 21){
          return;
        }

        this.text.classList.add('hidden');
        deck.allo('user');
      });

      this.standBtn.addEventListener('click', () =>{
        this.text.classList.add('hidden');

        this.stand();
      });

      this.textBtn.addEventListener('click', () =>{
        location.href = 'index.html';
      });
    }

    action(){
      this.text.classList.remove('hidden');
      this.textP.innerText = `あなたの合計は『${user.numberTotal}』です。\nもう1枚引く -> ヒット\nこの手札で勝負する -> スタンド`;

      if(user.numberTotal === 21){
        this.hitBtn.classList.add('none');
      }
    }

    stand(){
      if(dealer.numberTotal < 17){
        deck.allo('dealer');
        return;
      }

      dealer.open();
    }

    result(string){
      this.btns.classList.add('hidden');
      this.textBtn.classList.remove('hidden');
      this.text.classList.remove('hidden');

      switch(string){
        case 'winner':
          this.textP.innerText = `プレイヤー : 『${user.numberTotal}』\nディーラー : 『${dealer.numberTotal}』\n \nあなたの勝利となりました!`;
          break;
        case 'lose':
          this.textP.innerText = `プレイヤー : 『${user.numberTotal}』\nディーラー : 『${dealer.numberTotal}』\n \nディーラーの勝利となりました!`;
          break;
        case 'draw':
          this.textP.innerText = `プレイヤー : 『${user.numberTotal}』\nディーラー : 『${dealer.numberTotal}』\n \n勝負は引き分けとなりました!`;
          break;
        case 'userBurst':
          this.textP.innerText = 'バーストしました。\n \nディーラーの勝利となります!';
          break;
        case 'dealerBurst':
          this.textP.innerText = 'ディーラー側がバーストしました。\n \nあなたの勝利となります!';
          break;
        case 'drawBurst':
          this.textP.innerText = 'どちらもバーストしました。\n \n勝負は引き分けとなります!';
          break;
        case 'userBlackJack':
          this.textP.innerText = 'おめでとうございます!\nブラックジャックを達成しました!\n \nあなたの勝利です!';
          break;
        case 'dealerBlackJack':
          this.textP.innerText = 'ディーラー側が\nブラックジャックを達成しました!\n \nディーラーの勝利です!';
          break;
        case 'drawBlackJack':
          this.textP.innerText = 'お互いに\nブラックジャックを達成しました!\n \n勝負は引き分けとなります!';
          break;
      }
    }
  }

  const title = document.querySelector('.title');
  const startBtn = document.getElementById('start-btn');
  const container = document.querySelector('.container');

  const deck = new Deck();
  const user = new User();
  const dealer = new Dealer();
  const internal = new Internal();
  const other = new Other();

  for(let i = 0; i < 52; i++){
    const preload = document.createElement('img');
    preload.src = `img/card${i}.png`;
  }

  startBtn.addEventListener('click', () =>{
    title.classList.add('hidden');
    container.classList.remove('hidden');

    setTimeout(() =>{
      deck.allo('user');
    }, 500);
  });
})();