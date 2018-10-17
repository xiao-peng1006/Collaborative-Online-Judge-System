import { Injectable } from '@angular/core';
// import { PROBLEMS } from '../mock-problems'; // fake "database"
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { Problem } from '../models/problem.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // List of problems (Client side)
  // problems: Problem[] = PROBLEMS;

  private _problemSource = new BehaviorSubject<Problem[]>([]);

  constructor(private httpClient: HttpClient) { }

  // // Return a list of problems
  // getProblems(): Problem[] {
  //   return this.problems;
  // }
  //
  // // Return a problem by id
  // getProblem(id: number): Problem {
  //   // for every problem, if problem.id === id, return this problem.
  //   // == : check value
  //   // === : check value and type
  //   // 1 == "1" => true
  //   // 1 === "1" => false
  //   // arrow function
  //   return this.problems.find((problem) => problem.id === id);
  // }
  //
  // addProblem(problem: Problem) {
  //   problem.id = this.problems.length + 1;
  //   this.problems.push(problem);
  // }

  getProblems(): Observable<Problem[]> {
    this.httpClient.get('api/v1/problems')
      .toPromise()
      .then((res: any) => {
        this._problemSource.next(res);
      })
      .catch(this.handleError);

      return this._problemSource.asObservable();
  }

  getProblem(id: number): Promise<Problem> {
    return this.httpClient.get(`api/v1/problems/${id}`)
      .toPromise()
      .then((res: any) => res)
      .catch(this.handleError);
  }

  addProblem(problem: Problem) {
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

    return this.httpClient.post('api/v1/problems', problem, options)
      .toPromise()
      .then((res: any) => {
        this.getProblems();

        return res;
      })
      .catch(this.handleError);
  }

  editProblem(id: number, problem: Problem) {
    // console.log(id, problem);
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

    return this.httpClient.put(`api/v1/problems/${id}`, problem, options)
      .toPromise()
      .then((res: any) => {
          this.getProblem(id);

          return res;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.body || error);
  }

}
