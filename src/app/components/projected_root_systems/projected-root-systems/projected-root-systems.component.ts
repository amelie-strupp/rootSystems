import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Point } from '@svgdotjs/svg.js';
import { rootSystems3D } from 'src/app/data/rootSystems3D';
import { ProjectionCanvasService } from 'src/app/display/projections/projection-canvas.service';
import { ProjectionManagerService } from 'src/app/display/projections/projection-manager.service';
import { ProjectionPainterService } from 'src/app/display/projections/projection-painter.service';
import { ProjectionService } from 'src/app/display/projections/projection.service';
import { rootSystemColors } from 'src/app/display/RootSystemColorMode';
import { Colors } from 'src/app/display/values/colors';
import PointND from 'src/app/logic/maths/nD/PointND';
import Point3D from 'src/app/logic/maths_objects/3D/Point3D';
import { Matrix3, Matrix4 } from 'three';

@Component({
  selector: 'app-projected-root-systems',
  templateUrl: './projected-root-systems.component.html',
  styleUrls: ['./projected-root-systems.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectedRootSystemsComponent {
  @ViewChild('threeCanvas') canvas!: ElementRef;
  projectionStartDim: number = 3;
  projectionEndDim: number = 2;

  constructor(private projectionManager: ProjectionManagerService,
    private cd: ChangeDetectorRef
    ){
      projectionManager.dimensionsChanged.subscribe(() => {
        this.updateProjectionType();
        this.cd.detectChanges();
      })
  }
  ngAfterViewInit(){
        this.projectionManager.initializeView(this.canvas.nativeElement);
  }

  updateProjectionType(){
    this.projectionStartDim = this.projectionManager.startDimension;
    this.projectionEndDim = this.projectionManager.endDimension;

  }
}
