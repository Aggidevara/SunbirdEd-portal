/*
*
* Author: Sunil A S<sunils@ilimi.in>
*
*/

import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash-es';
import { ICollectionTreeNodes, ICollectionTreeOptions, MimeTypeTofileType } from '@sunbird/shared';
import { ResourceService } from '@sunbird/shared';
import * as TreeModel from 'tree-model';
@Component({
  selector: 'app-collection-tree',
  templateUrl: './collection-tree.component.html'
})
export class CollectionTreeComponent implements OnInit, OnChanges {

  @Input() public nodes: ICollectionTreeNodes;
  @Input() public options: ICollectionTreeOptions;
  @Output() public contentSelect: EventEmitter<{id: string, title: string}> = new EventEmitter();
  @Input() contentStatus: any;
  private rootNode: any;
  public rootChildrens: any;
  private iconColor = {
    '0': 'fancy-tree-black',
    '1': 'fancy-tree-blue',
    '2': 'fancy-tree-green'
  };
  constructor(public resourceService?: ResourceService) {
    this.resourceService = resourceService;
  }
  ngOnInit() {
    this.initialize();
  }

  ngOnChanges() {
    this.initialize();
  }

  public onNodeClick(node: any) {
    if (!node.folder) {
      this.contentSelect.emit({ id: node.id, title: node.title });
    }
  }

  public onItemSelect(item: any) {
    if (!item.folder) {
      this.contentSelect.emit({ id: item.data.id, title: item.title });
    }
  }

  private initialize() {
    this.rootNode = this.createTreeModel();
    if (this.rootNode) {
      this.rootChildrens = this.rootNode.children;
      this.addNodeMeta();
    }
  }

  private createTreeModel() {
    if (!this.nodes) { return; }
    const model = new TreeModel();
    return model.parse(this.nodes.data);
  }

  private addNodeMeta() {
    if (!this.rootNode) { return; }
    this.rootNode.walk((node) => {
      node.fileType = MimeTypeTofileType[node.model.mimeType];
      node.id = node.model.identifier;
      if (node.children && node.children.length) {
        if (this.options.folderIcon) {
          node.icon = this.options.folderIcon;
        }
        node.folder = true;
      } else {
        if ( node.fileType === MimeTypeTofileType['application/vnd.ekstep.content-collection']) {
          node.folder = true;
        } else {
          const indexOf = _.findIndex(this.contentStatus, { });
          if (this.contentStatus) {
            const content: any = _.find(this.contentStatus, { 'contentId': node.model.identifier});
            const status = (content && content.status) ? content.status.toString() : 0;
            node.iconColor = this.iconColor[status];
          } else {
            node.iconColor = this.iconColor['0'];
          }
          node.folder = false;
        }
        node.icon = this.options.customFileIcon[node.fileType] || this.options.fileIcon;
        node.icon = `${node.icon} ${node.iconColor}`;
      }
      if (node.folder && !(node.children.length)) {
        node.title = node.model.name + '<strong> (' + this.resourceService.messages.stmsg.m0121 + ')</strong>';
        node.extraClasses = 'disabled';
      } else {
        node.title = node.model.name || 'Untitled File';
        node.extraClasses = '';
      }
    });
  }
}
