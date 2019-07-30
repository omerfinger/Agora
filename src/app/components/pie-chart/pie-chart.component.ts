import { pieData } from './../../models/pie-data';
import { ItemService } from '../../services/item.service';
import { Component, ElementRef, ViewChild, AfterViewInit, Input } from "@angular/core";
import * as D3 from 'd3';

@Component({
    selector: 'pie-chart',
    templateUrl: 'pie-chart.component.html'
})

export class PieChart implements AfterViewInit {
    @ViewChild("containerPieChart") element: ElementRef;

    @Input()
    pieData: pieData [];

    private host: D3.Selection<any>;
    private svg: D3.Selection<any>;
    private width: number;
    private height: number;
    private radius: number;
    private htmlElement: HTMLElement;

    constructor(private itemService: ItemService) { }

    ngAfterViewInit() {
        this.htmlElement = this.element.nativeElement;
        this.host = D3.select(this.htmlElement);
        this.setup();
        this.buildSVG();
        this.buildPie();
    }

    private setup(): void {
        this.width = 300;
        this.height = 300;
        this.radius = Math.min(this.width, this.height) / 2;
    }

    private buildSVG(): void {
        this.host.html("");
        this.svg = this.host.append("svg")
            .attr("viewBox", `0 0 ${this.width} ${this.height}`)
            .append("g")
            .attr("transform", `translate(${this.width / 2},${this.height / 2})`);
    }

    private buildPie(): void {
        let pie = D3.pie();
        let values = this.pieData.map(data => data.value);
        let arcSelection = this.svg.selectAll(".arc")
            .data(pie(values))
            .enter()
            .append("g")
            .attr("class", "arc");

        this.populatePie(arcSelection);
    }

    private populatePie(arcSelection: D3.Selection<D3.pie.Arc>): void {
        let innerRadius = this.radius - 50;
        let outerRadius = this.radius - 10;
        let pieColor = D3.scaleOrdinal(D3.schemeCategory10);
        let arc = D3.arc<D3.pie.Arc>()
            .outerRadius(outerRadius).innerRadius(0);
        arcSelection.append("path")
            .attr("d", arc)
            .attr("fill", (datum, index) => {
                return pieColor(this.pieData[index].label);
            });

        arcSelection.append("text")
            .attr("transform", (datum: any) => {
                datum.innerRadius = 0;
                datum.outerRadius = outerRadius;
                return "translate(" + arc.centroid(datum) + ")";
            })
            .text((datum, index) => this.pieData[index].label)
            .style("text-anchor", "middle");
    }

}