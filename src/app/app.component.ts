import {
  Component,
  OnInit,
  Renderer2,
  AfterViewInit,
  ElementRef,
  ViewChildren,
  QueryList,
  AfterViewChecked,
} from '@angular/core';
import { sampleProducts } from './products';

@Component({
  selector: 'my-app',
  template: `
        <kendo-grid [data]="gridData">
            <kendo-grid-column field="ProductName">
                <ng-template kendoGridCellTemplate let-dataItem let-rowIndex="rowIndex">
                    Row: {{rowIndex}} /
                    <strong>{{dataItem.ProductName}}</strong>
                </ng-template>
            </kendo-grid-column>
            <kendo-grid-column title="Discontinued">
              <ng-template kendoGridCellTemplate let-dataItem>
                  <span #cell></span>
              </ng-template>
            </kendo-grid-column>
        </kendo-grid>
    `,
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChildren('cell') cells: QueryList<ElementRef>;
  public gridData: unknown[] = sampleProducts;
  public rowSpans = [];

  ngOnInit(): void {
    let entry = {};
    let isDark = false;
    for (let index = 0; index < this.gridData.length; index++) {
      if (
        index == 0 ||
        this.gridData[index - 1]['Discontinued'] !==
          this.gridData[index]['Discontinued']
      ) {
        // Start new entry
        entry = {
          index: index,
          value: this.gridData[index]['Discontinued'],
          span: 1,
          isDark: isDark,
        };
        this.rowSpans.push(entry);
        isDark = !isDark;
      } else {
        // Add to current entry
        entry['span']++;
      }
    }

    console.log('rowSpans', this.rowSpans);
  }

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    console.log('grid', this.gridData);
    console.log(this.cells);

    const insertIndexes = this.rowSpans.map((span) => span.index);
    this.cells.forEach((cell, index) => {
      // Get the native element of the cell
      const cellNativeElement = cell.nativeElement.parentNode;
      const rowIndex = index;
      console.log(cellNativeElement, rowIndex);

      // Set the text-align CSS property
      if (insertIndexes.includes(rowIndex)) {
        const rowSpanEntry = this.rowSpans.find(
          (span) => span.index === rowIndex
        );
        if (rowSpanEntry.isDark) {
          this.renderer.setStyle(
            cellNativeElement,
            'background-color',
            'lightblue'
          );
        } else {
          this.renderer.setStyle(
            cellNativeElement,
            'background-color',
            'lightpink'
          );
        }

        this.renderer.setAttribute(
          cellNativeElement,
          'rowspan',
          `${rowSpanEntry.span}`
        );
        this.renderer.setProperty(
          cellNativeElement,
          'innerHTML',
          `${rowSpanEntry.value}`
        );
      } else {
        this.renderer.removeChild(
          cellNativeElement.parentNode,
          cellNativeElement
        );
      }
    });
  }
}
