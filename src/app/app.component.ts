import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'catgotchi';
  public hungryPoints: number = 100;
  public sleepyPoints: number = 100;
  public cleanPoints: number = 100;
  public happyPoints: number = 100;
  public isHappy: boolean = true;
  public isDied: boolean = false;
  public showButtonRestart: boolean = false;

  @ViewChild('modal')
  modal!: ElementRef;

  private gameTimer = () => {

    if (this.hungryPoints <= 0 || this.sleepyPoints <= 0 || this.cleanPoints <= 0 || this.happyPoints <= 0) {
      clearInterval(this.interval)
      this.modal.nativeElement.click();
      this.isDied = true
    } else if (!this.isDied) {

      let totalPoints: number = this.hungryPoints + this.sleepyPoints + this.cleanPoints + this.happyPoints;
      let areAllOver50 = [this.hungryPoints, this.sleepyPoints, this.cleanPoints, this.happyPoints].every(points => points > 50);

      if (this.hungryPoints <= 1) {
        this.hungryPoints = 0;
      } else {
        this.hungryPoints -= 2;
      }
      this.sleepyPoints -= 1;
      this.cleanPoints -= 1;
      if (this.happyPoints <= 1) {
        this.happyPoints = 0;
      } else {
        this.happyPoints -= 2;
      }

      if (!areAllOver50 || totalPoints < 200) {
        console.log('ciao')
        console.log(this.isHappy)
        this.isHappy = false
        console.log(this.isHappy)
      }
      else if (totalPoints > 200 && areAllOver50) {
        this.isHappy = true
      }
    }
  }

  private interval: any;


  ngOnInit() {
   this.interval = setInterval(this.gameTimer, 1000)

    if (this.hungryPoints == 0 || this.sleepyPoints == 0 || this.cleanPoints == 0 || this.happyPoints == 0) {
      this.stopGame()
    }
  }

  startGame() {
    this.interval = setInterval(this.gameTimer, 1000)
  }
  stopGame() {
    clearInterval(this.interval)
  }

  gimmeTuna() {
    if (this.hungryPoints >= 95) {
      this.hungryPoints = 100;
    } else {
      this.hungryPoints += 5;
    }
    if (this.cleanPoints >= 2) {
      this.cleanPoints -= 2
    }
  }
  gimmeSleep() {
    if (this.sleepyPoints >= 95) {
      this.sleepyPoints = 100;
    } else {
      this.sleepyPoints += 5;
    }
    if (this.hungryPoints >= 2) {
      this.hungryPoints -= 2
    }
    if (this.happyPoints >= 2) {
      this.happyPoints -= 2
    }
  }
  gimmeBath() {
    if (this.cleanPoints >= 95) {
      this.cleanPoints = 100;
    } else {
      this.cleanPoints += 5;
    }
    if (this.happyPoints >= 5) {
      this.happyPoints -= 5
    }
  }
  gimmeRubs() {
    if (this.happyPoints >= 95) {
      this.happyPoints = 100;
    } else {
      this.happyPoints += 5;
    }
    if (this.hungryPoints >= 3) {
      this.hungryPoints -= 3
    }
  }

  gimme(something: string): any {
    if (something == 'tuna') {
      this.gimmeTuna()
    }
    if (something == 'sleep') {
      this.gimmeSleep()
    }
    if (something == 'bath') {
      this.gimmeBath()
    }
    if (something == 'rubs') {
      this.gimmeRubs()
    }
  }

  restart() {
    this.hungryPoints = 100;
    this.sleepyPoints = 100;
    this.cleanPoints = 100;
    this.happyPoints = 100;
    this.isHappy = true;
    this.isDied = false;
    this.startGame();
    this.showButtonRestart = false;

  }

  buttonRestart() {
    this.showButtonRestart = true;
  }
}
