import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function MySidebar({
  menuConfig = [],
  title = "IT Jobs",
  basePath = "",
  className = "",
  ...props
}) {
  const location = useLocation();

  const STYLES = {
    menuItem: "mb-1.5",
    iconContainer:
      "w-5.5 h-5.5 mr-2 flex items-center justify-center text-foreground",
    icon: "w-full h-full text-foreground/75",
    chevron:
      "ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90",
    subMenu: "border-l-2 border-sidebar-border/50 ml-2.5 pl-2 my-1",
    subButton: "hover:bg-sidebar-accent/50 transition-colors px-3",
    subText: "text-sm",
  };

  const isActive = (path) => location.pathname === path;

  const isSubmenuActive = (paths) =>
    paths.some((path) => location.pathname.startsWith(path));

  const getActiveStyles = (isActiveState, isSubmenu = false) => {
    if (isActiveState) {
      return isSubmenu
        ? "bg-gradient-to-r from-primary/10 to-primary/3 text-primary"
        : "bg-gradient-to-r from-primary/20 to-primary/5 text-primary shadow-sm hover:bg-gradient-to-r hover:from-primary/25 hover:to-primary/10 hover:text-primary";
    }
    return isSubmenu
      ? ""
      : "hover:bg-sidebar-accent/80 hover:text-sidebar-accent-foreground";
  };

  const getTextColor = (isActiveState, isSubmenu = false) => {
    if (isActiveState) return "text-primary";
    return isSubmenu ? "text-sidebar-foreground/80" : "";
  };

  const renderIcon = (icon, isActiveState) => {
    if (!icon) return null;

    return (
      <div className={STYLES.iconContainer}>
        {React.cloneElement(icon, {
          className: `${STYLES.icon} ${getTextColor(isActiveState)}`,
        })}
      </div>
    );
  };

  const renderSubMenuItem = (subItem, parentPath) => {
    const fullPath = `${basePath}${parentPath}${subItem.path}`;
    const isActiveState = isActive(fullPath);

    return (
      <SidebarMenuSubItem key={subItem.key || subItem.path}>
        <SidebarMenuSubButton
          asChild
          className={`${STYLES.subButton} ${getActiveStyles(
            isActiveState,
            true
          )}`}
        >
          <Link to={fullPath}>
            <span
              className={`${getTextColor(isActiveState, true)} ${
                STYLES.subText
              }`}
            >
              {subItem.label}
            </span>
          </Link>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    );
  };

  const renderSimpleMenuItem = (item) => {
    const fullPath = `${basePath}${item.path}`;
    const isActiveState = isActive(fullPath);

    return (
      <SidebarMenuItem key={item.key || item.path} className={STYLES.menuItem}>
        <SidebarMenuButton
          asChild
          className={`transition-colors rounded-md ${getActiveStyles(
            isActiveState
          )}`}
        >
          <Link to={fullPath} className="flex items-center">
            {renderIcon(item.icon, isActiveState)}
            <span>{item.label}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  const renderCollapsibleMenuItem = (item) => {
    const subPaths = item.children.map(
      (subItem) => `${basePath}${item.path}${subItem.path}`
    );
    const isSubmenuActiveState = isSubmenuActive(subPaths);

    return (
      <Collapsible
        asChild
        key={item.key || item.path}
        className="group/collapsible"
      >
        <SidebarMenuItem className={STYLES.menuItem}>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              className={`transition-colors rounded-md ${getActiveStyles(
                isSubmenuActiveState
              )}`}
            >
              {renderIcon(item.icon, isSubmenuActiveState)}
              <span>{item.label}</span>
              <ChevronRight
                className={`${STYLES.chevron} ${
                  isSubmenuActiveState
                    ? "text-primary/70"
                    : "text-sidebar-foreground/60"
                }`}
              />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub className={STYLES.subMenu}>
              {item.children.map((subItem) =>
                renderSubMenuItem(subItem, item.path)
              )}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  };

  const renderMenuItems = () => {
    return menuConfig.map((item) => {
      return item.children?.length > 0
        ? renderCollapsibleMenuItem(item)
        : renderSimpleMenuItem(item);
    });
  };

  const renderTitle = () => {
    const titleParts = title.split(" ");
    return (
      <div className="flex items-center justify-center">
        <span className="text-primary font-bold text-2xl">{titleParts[0]}</span>
        <span className="text-foreground font-bold text-2xl">
          {titleParts[1] || ""}
        </span>
      </div>
    );
  };

  return (
    <Sidebar
      collapsible="offcanvas"
      className={`border-r border-sidebar-border shadow-sm ${className}`}
      {...props}
    >
      <SidebarHeader className="py-4 px-3">
        {renderTitle()}
        <Separator className="mt-4 bg-sidebar-border/50" />
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarMenu>{renderMenuItems()}</SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
