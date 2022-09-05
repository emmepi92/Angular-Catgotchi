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
  public openModal: boolean = false;
  private interval: any;

  @ViewChild('modal')
  modal!: ElementRef;

  private gameTimer = () => {
    if (this.hungryPoints <= 0 || this.sleepyPoints <= 0 || this.cleanPoints <= 0 || this.happyPoints <= 0) {
      clearInterval(this.interval)
      this.openModal = true
      this.isDied = true
    } else if (!this.isDied) {

      this.isHappy = [this.hungryPoints, this.sleepyPoints, this.cleanPoints, this.happyPoints].every(points => points > 50);
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
    }
  }

  ngOnInit() {
   this.interval = setInterval(this.gameTimer, 1000)
  }

  startGame() {
    this.interval = setInterval(this.gameTimer, 1000)
  }

  give5Points(points: number):number {
    if (points >= 95) {
      return 100;
    } else {
      return points + 5;
    }
  }

  losePointsCollateral(points: number, deficit: number): number {
    if (points >= deficit) {
      return points - deficit
    } else {
      return points
    }
  }

  gimmeTuna() {
    this.hungryPoints = this.give5Points(this.hungryPoints);
    this.cleanPoints = this.losePointsCollateral(this.cleanPoints, 2)
  }
  gimmeSleep() {
    this.sleepyPoints = this.give5Points(this.sleepyPoints)
    this.hungryPoints = this.losePointsCollateral(this.hungryPoints, 2)
    this.happyPoints = this.losePointsCollateral(this.happyPoints, 2)
  }
  gimmeBath() {
    this.cleanPoints = this.give5Points(this.cleanPoints)
    this.happyPoints = this.losePointsCollateral(this.happyPoints, 5)
  }
  gimmeRubs() {
    this.happyPoints = this.give5Points(this.happyPoints)
    this.hungryPoints = this.losePointsCollateral(this.hungryPoints, 3)
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

  onRestart() {
      this.hungryPoints = 100;
      this.sleepyPoints = 100;
      this.cleanPoints = 100;
      this.happyPoints = 100;
      this.isHappy = true;
      this.isDied = false;
      this.startGame();
      this.showButtonRestart = false;
      this.openModal = false;
  }

  buttonRestart() {
    this.showButtonRestart = true;
  }
}
