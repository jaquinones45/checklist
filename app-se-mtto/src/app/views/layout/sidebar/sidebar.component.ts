import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Renderer2,
  Inject,
} from "@angular/core";
import { DOCUMENT } from "@angular/common";

import MetisMenu from "metismenujs/dist/metismenujs";

import { MENU } from "./menu";
import { MenuItem } from "./menu.model";
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit, AfterViewInit {
  @ViewChild("sidebarToggler") sidebarToggler: ElementRef;

  menuItems: MenuItem[] = [];
  @ViewChild("sidebarMenu") sidebarMenu: ElementRef;

  navItemSelect = -1;
  navSubItemSelect = { item: -1, subItem: -1 };
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    router: Router
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        /**
         * Activating the current active item dropdown
         */
        this._activateMenuDropdown();

        /**
         * closing the sidebar
         */
        if (window.matchMedia("(max-width: 991px)").matches) {
          this.document.body.classList.remove("sidebar-open");
        }
      }
    });
  }

  ngOnInit(): void {
    this.menuItems = this.getMenu();

    let url = window.location.href.split("/#");
    if (url.length > 0) {
      let indexItem = -1;
      let indexSubItem = -1;
      for (let i = 0; i < this.menuItems.length; i++) {
        const element = this.menuItems[i];
        if (element.link == url[1]) {
          indexItem = i;
        }
        if (element.subItems) {
          indexSubItem = element.subItems.findIndex((c) => c.link == url[1]);
          if (indexSubItem != -1 && indexItem == -1) indexItem = i;
        }
        if (indexSubItem != -1 && indexItem != -1) break;
      }

      this.navItemSelect = indexItem;
      if (indexSubItem != -1) {
        this.navSubItemSelect.subItem = indexSubItem;
        this.navSubItemSelect.item = indexItem;
      }

      // let indexItem = this.menuItems.findIndex((c) => c.link == 'url')
      // console.log(indexItem);
      // let indexSubItem =
    }

    /**
     * Sidebar-folded on desktop (min-width:992px and max-width: 1199px)
     */
    const desktopMedium = window.matchMedia(
      "(min-width:992px) and (max-width: 1199px)"
    );
    desktopMedium.addListener(this.iconSidebar);
    this.iconSidebar(desktopMedium);
  }
  getMenu(): MenuItem[] {
    if (localStorage.getItem("isAdmin") == 'false') {
      const menuini: MenuItem[] = [
        {
          label: "PÁGINA PRINCIPAL",
          isTitle: true,
          isArea: false,
        },
        {
          label: "Dashboard",
          icon: "home",
          link: "/dashboard",
        },
        {
          label: "MÓDULOS",
          isTitle: true,
          isArea: false,
        },
        {
          label: "Rutina Mtto",
          icon: "database",
          subItems: [
            {
              label: "Rutina Mtto",
              link: "/routine-mtto",
            },
            {
              label: "Tipo de sistema",
              link: "/type-system",
            },
          ]
        },
        {
          label: "Mtto Correctivo",
          icon: "database",
          link: "/mtto-corrective",
        },
        {
          label: "Registro Fallas",
          icon: "database",
          link: "/fault-log",
        },
        {
          label: "Inventario Equipos",
          icon: "database",
          link: "/equipment-inventory",
        },
        {
          label: "Fallas Equipos",
          icon: "database",
          link: "/equipment-failures",
        },
        {
          label: "KPI",
          icon: "database",
          link: "/kpi",
        },
      ];

      return menuini;
    } else {
      const menuini: MenuItem[] = [
        {
          label: "PÁGINA PRINCIPAL",
          isTitle: true,
          isArea: false,
        },
        {
          label: "Dashboard",
          icon: "home",
          link: "/",
        },
        {
          label: "FORMULARIO",
          isTitle: true,
          isArea: false,
        },
        {
          label: "Lista de revisión",
          icon: "clipboard",
          link: "/form",
        },
        {
          label: "CONFIGURACIÓN",
          isTitle: true,
          isArea: false,
        },
        {
          label: "Clientes",
          icon: "settings",
          link: "/client",
        },
        {
          label: "País",
          icon: "settings",
          link: "/country",
        },
        {
          label: "Componentes",
          icon: "settings",
          link: "/type-component",
        },
      ];

      return menuini;
    }
  }
  getLabel(plant: any, area) {
    if (area == "ingredion")
      return this.titleCase(plant.replace("_", " ").split("_")[0]);
    else return this.titleCase(plant.replace("_", " ").replace("_", " "));
  }
  public titleCase(string): string {
    const sentence = string.toLowerCase().split(" ");
    for (let i = 0; i < sentence.length; i++) {
      try {
        sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
      } catch {
        sentence[i] = sentence[i][0] + sentence[i].slice(1);
      }
    }

    return sentence.join(" ");
  }
  ngAfterViewInit() {
    // activate menu item
    new MetisMenu(this.sidebarMenu.nativeElement);

    this._activateMenuDropdown();
  }

  /**
   * Toggle sidebar on hamburger button click
   */
  toggleSidebar(e) {
    this.sidebarToggler.nativeElement.classList.toggle("active");
    this.sidebarToggler.nativeElement.classList.toggle("not-active");
    if (window.matchMedia("(min-width: 992px)").matches) {
      e.preventDefault();
      this.document.body.classList.toggle("sidebar-folded");
    } else if (window.matchMedia("(max-width: 991px)").matches) {
      e.preventDefault();
      this.document.body.classList.toggle("sidebar-open");
    }
  }

  /**
   * Toggle settings-sidebar
   */
  toggleSettingsSidebar(e) {
    e.preventDefault();
    this.document.body.classList.toggle("settings-open");
  }

  /**
   * Open sidebar when hover (in folded folded state)
   */
  operSidebarFolded() {
    if (this.document.body.classList.contains("sidebar-folded")) {
      this.document.body.classList.add("open-sidebar-folded");
    }
  }

  /**
   * Fold sidebar after mouse leave (in folded state)
   */
  closeSidebarFolded() {
    if (this.document.body.classList.contains("sidebar-folded")) {
      this.document.body.classList.remove("open-sidebar-folded");
    }
  }

  /**
   * Sidebar-folded on desktop (min-width:992px and max-width: 1199px)
   */
  iconSidebar(e) {
    if (e.matches) {
      this.document.body.classList.add("sidebar-folded");
    } else {
      this.document.body.classList.remove("sidebar-folded");
    }
  }

  /**
   * Switching sidebar light/dark
   */
  onSidebarThemeChange(event) {
    this.document.body.classList.remove("sidebar-light", "sidebar-dark");
    this.document.body.classList.add(event.target.value);
    this.document.body.classList.remove("settings-open");
  }

  /**
   * Returns true or false if given menu item has child or not
   * @param item menuItem
   */
  hasItems(item: MenuItem) {
    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  }

  /**
   * Reset the menus then hilight current active menu item
   */
  _activateMenuDropdown() {
    //this.resetMenuItems();
    this.activateMenuItems();
  }

  /**
   * Resets the menus
   */

  /**
   * Toggles the menu items
   */
  activateMenuItems() {
    const links = document.getElementsByClassName("nav-link-ref");

    let menuItemEl = null;

    for (let i = 0; i < links.length; i++) {
      // tslint:disable-next-line: no-string-literal
      if (window.location.pathname === links[i]["pathname"]) {
        menuItemEl = links[i];

        break;
      }
    }

    if (menuItemEl) {
      menuItemEl.classList.add("mm-active");
      const parentEl = menuItemEl.parentElement;

      if (parentEl) {
        parentEl.classList.add("mm-active");

        const parent2El = parentEl.parentElement;
        if (parent2El) {
          parent2El.classList.add("mm-show");
        }

        const parent3El = parent2El.parentElement;
        if (parent3El) {
          parent3El.classList.add("mm-active");

          if (parent3El.classList.contains("side-nav-item")) {
            const firstAnchor = parent3El.querySelector(".side-nav-link-a-ref");

            if (firstAnchor) {
              firstAnchor.classList.add("mm-active");
            }
          }

          const parent4El = parent3El.parentElement;
          if (parent4El) {
            parent4El.classList.add("mm-show");

            const parent5El = parent4El.parentElement;
            if (parent5El) {
              parent5El.classList.add("mm-active");
            }
          }
        }
      }
    }
  }

  selectItem(iItem: number, containsSubItems) {
    if (this.navSubItemSelect.subItem != -1) {
      if (this.navSubItemSelect.item != iItem && !containsSubItems) {
        this.navSubItemSelect.item = -1;
        this.navSubItemSelect.subItem = -1;
        this.navItemSelect = iItem;
      }
    } else {
      if (!containsSubItems) {
        this.navItemSelect = iItem;
      }
      // else
      //   this.navItemSelect =
      //     containsSubItems && this.navItemSelect == iItem ? -1 : iItem;
    }
  }

  selectSubItem(iItem: number, subItem: number) {
    this.navSubItemSelect.item = iItem;
    this.navSubItemSelect.subItem = subItem;
    this.navItemSelect = iItem;
  }
}
