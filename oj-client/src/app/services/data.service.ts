import { Injectable } from '@angular/core';
import { Problem } from '../models/problem.model';
import { PROBLEMS } from '../mock-problems'; // fake "database"

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // List of problems
  problems: Problem[] = PROBLEMS;

  constructor() { }

  // Return a list of problems
  getProblems(): Problem[] {
    return this.problems;
  }

  // Return a problem by id
  getProblem(id: number): Problem {
    // for every problem, if problem.id === id, return this problem.
    // == : check value
    // === : check value and type
    // 1 == "1" => true
    // 1 === "1" => false
    // arrow function
    return this.problems.find((problem) => problem.id === id);
  }

  addProblem(problem: Problem) {
    problem.id = this.problems.length + 1;
    this.problems.push(problem);
  }
}
