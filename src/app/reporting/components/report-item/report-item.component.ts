import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Report } from 'src/app/shared/models/report';

@Component({
  selector: 'app-report-item',
  templateUrl: './report-item.component.html',
  styleUrls: ['./report-item.component.scss']
})
export class ReportItemComponent implements OnInit {

  public report: Report;

  constructor(
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.report = this.activatedRoute.snapshot.data.report as Report;
  }

  ngOnInit(): void {
  }

}
