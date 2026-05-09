import { a as createLucideIcon, r as reactExports, j as jsxRuntimeExports, c as cn, X } from "./index-BiNIKcBE.js";
import { u as useControllableState, a as useId, b as useComposedRefs, P as Primitive, c as composeEventHandlers, d as Portal$1, h as hideOthers, R as ReactRemoveScroll, e as createContextScope, f as createSlot, g as useFocusGuards, F as FocusScope, D as DismissableLayer, B as Badge } from "./index-8fijkRIb.js";
import { R as Root2$1, A as Anchor, c as createPopperScope, C as Content, a as Arrow } from "./index-BtIPAA8J.js";
import { P as Presence } from "./index-BtANKhBP.js";
import { e as useListStates, f as useSetState, g as useRemoveState, T as TravelStatus } from "./use-travel-CZZKui9J.js";
import { M as MapPin } from "./map-pin-DiLIuSbI.js";
import { H as House } from "./house-D4MLZOvp.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode);
var POPOVER_NAME = "Popover";
var [createPopoverContext] = createContextScope(POPOVER_NAME, [
  createPopperScope
]);
var usePopperScope = createPopperScope();
var [PopoverProvider, usePopoverContext] = createPopoverContext(POPOVER_NAME);
var Popover$1 = (props) => {
  const {
    __scopePopover,
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    modal = false
  } = props;
  const popperScope = usePopperScope(__scopePopover);
  const triggerRef = reactExports.useRef(null);
  const [hasCustomAnchor, setHasCustomAnchor] = reactExports.useState(false);
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
    caller: POPOVER_NAME
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2$1, { ...popperScope, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    PopoverProvider,
    {
      scope: __scopePopover,
      contentId: useId(),
      triggerRef,
      open,
      onOpenChange: setOpen,
      onOpenToggle: reactExports.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
      hasCustomAnchor,
      onCustomAnchorAdd: reactExports.useCallback(() => setHasCustomAnchor(true), []),
      onCustomAnchorRemove: reactExports.useCallback(() => setHasCustomAnchor(false), []),
      modal,
      children
    }
  ) });
};
Popover$1.displayName = POPOVER_NAME;
var ANCHOR_NAME = "PopoverAnchor";
var PopoverAnchor = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopePopover, ...anchorProps } = props;
    const context = usePopoverContext(ANCHOR_NAME, __scopePopover);
    const popperScope = usePopperScope(__scopePopover);
    const { onCustomAnchorAdd, onCustomAnchorRemove } = context;
    reactExports.useEffect(() => {
      onCustomAnchorAdd();
      return () => onCustomAnchorRemove();
    }, [onCustomAnchorAdd, onCustomAnchorRemove]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Anchor, { ...popperScope, ...anchorProps, ref: forwardedRef });
  }
);
PopoverAnchor.displayName = ANCHOR_NAME;
var TRIGGER_NAME = "PopoverTrigger";
var PopoverTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopePopover, ...triggerProps } = props;
    const context = usePopoverContext(TRIGGER_NAME, __scopePopover);
    const popperScope = usePopperScope(__scopePopover);
    const composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);
    const trigger = /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": context.open,
        "aria-controls": context.contentId,
        "data-state": getState(context.open),
        ...triggerProps,
        ref: composedTriggerRef,
        onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
      }
    );
    return context.hasCustomAnchor ? trigger : /* @__PURE__ */ jsxRuntimeExports.jsx(Anchor, { asChild: true, ...popperScope, children: trigger });
  }
);
PopoverTrigger$1.displayName = TRIGGER_NAME;
var PORTAL_NAME = "PopoverPortal";
var [PortalProvider, usePortalContext] = createPopoverContext(PORTAL_NAME, {
  forceMount: void 0
});
var PopoverPortal = (props) => {
  const { __scopePopover, forceMount, children, container } = props;
  const context = usePopoverContext(PORTAL_NAME, __scopePopover);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PortalProvider, { scope: __scopePopover, forceMount, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Portal$1, { asChild: true, container, children }) }) });
};
PopoverPortal.displayName = PORTAL_NAME;
var CONTENT_NAME = "PopoverContent";
var PopoverContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(CONTENT_NAME, props.__scopePopover);
    const { forceMount = portalContext.forceMount, ...contentProps } = props;
    const context = usePopoverContext(CONTENT_NAME, props.__scopePopover);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: context.modal ? /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverContentModal, { ...contentProps, ref: forwardedRef }) : /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverContentNonModal, { ...contentProps, ref: forwardedRef }) });
  }
);
PopoverContent$1.displayName = CONTENT_NAME;
var Slot = createSlot("PopoverContent.RemoveScroll");
var PopoverContentModal = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = usePopoverContext(CONTENT_NAME, props.__scopePopover);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    const isRightClickOutsideRef = reactExports.useRef(false);
    reactExports.useEffect(() => {
      const content = contentRef.current;
      if (content) return hideOthers(content);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ReactRemoveScroll, { as: Slot, allowPinchZoom: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      PopoverContentImpl,
      {
        ...props,
        ref: composedRefs,
        trapFocus: context.open,
        disableOutsidePointerEvents: true,
        onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
          var _a;
          event.preventDefault();
          if (!isRightClickOutsideRef.current) (_a = context.triggerRef.current) == null ? void 0 : _a.focus();
        }),
        onPointerDownOutside: composeEventHandlers(
          props.onPointerDownOutside,
          (event) => {
            const originalEvent = event.detail.originalEvent;
            const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
            const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
            isRightClickOutsideRef.current = isRightClick;
          },
          { checkForDefaultPrevented: false }
        ),
        onFocusOutside: composeEventHandlers(
          props.onFocusOutside,
          (event) => event.preventDefault(),
          { checkForDefaultPrevented: false }
        )
      }
    ) });
  }
);
var PopoverContentNonModal = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = usePopoverContext(CONTENT_NAME, props.__scopePopover);
    const hasInteractedOutsideRef = reactExports.useRef(false);
    const hasPointerDownOutsideRef = reactExports.useRef(false);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      PopoverContentImpl,
      {
        ...props,
        ref: forwardedRef,
        trapFocus: false,
        disableOutsidePointerEvents: false,
        onCloseAutoFocus: (event) => {
          var _a, _b;
          (_a = props.onCloseAutoFocus) == null ? void 0 : _a.call(props, event);
          if (!event.defaultPrevented) {
            if (!hasInteractedOutsideRef.current) (_b = context.triggerRef.current) == null ? void 0 : _b.focus();
            event.preventDefault();
          }
          hasInteractedOutsideRef.current = false;
          hasPointerDownOutsideRef.current = false;
        },
        onInteractOutside: (event) => {
          var _a, _b;
          (_a = props.onInteractOutside) == null ? void 0 : _a.call(props, event);
          if (!event.defaultPrevented) {
            hasInteractedOutsideRef.current = true;
            if (event.detail.originalEvent.type === "pointerdown") {
              hasPointerDownOutsideRef.current = true;
            }
          }
          const target = event.target;
          const targetIsTrigger = (_b = context.triggerRef.current) == null ? void 0 : _b.contains(target);
          if (targetIsTrigger) event.preventDefault();
          if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.current) {
            event.preventDefault();
          }
        }
      }
    );
  }
);
var PopoverContentImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopePopover,
      trapFocus,
      onOpenAutoFocus,
      onCloseAutoFocus,
      disableOutsidePointerEvents,
      onEscapeKeyDown,
      onPointerDownOutside,
      onFocusOutside,
      onInteractOutside,
      ...contentProps
    } = props;
    const context = usePopoverContext(CONTENT_NAME, __scopePopover);
    const popperScope = usePopperScope(__scopePopover);
    useFocusGuards();
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      FocusScope,
      {
        asChild: true,
        loop: true,
        trapped: trapFocus,
        onMountAutoFocus: onOpenAutoFocus,
        onUnmountAutoFocus: onCloseAutoFocus,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          DismissableLayer,
          {
            asChild: true,
            disableOutsidePointerEvents,
            onInteractOutside,
            onEscapeKeyDown,
            onPointerDownOutside,
            onFocusOutside,
            onDismiss: () => context.onOpenChange(false),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Content,
              {
                "data-state": getState(context.open),
                role: "dialog",
                id: context.contentId,
                ...popperScope,
                ...contentProps,
                ref: forwardedRef,
                style: {
                  ...contentProps.style,
                  // re-namespace exposed content custom properties
                  ...{
                    "--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)",
                    "--radix-popover-content-available-width": "var(--radix-popper-available-width)",
                    "--radix-popover-content-available-height": "var(--radix-popper-available-height)",
                    "--radix-popover-trigger-width": "var(--radix-popper-anchor-width)",
                    "--radix-popover-trigger-height": "var(--radix-popper-anchor-height)"
                  }
                }
              }
            )
          }
        )
      }
    );
  }
);
var CLOSE_NAME = "PopoverClose";
var PopoverClose = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopePopover, ...closeProps } = props;
    const context = usePopoverContext(CLOSE_NAME, __scopePopover);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        ...closeProps,
        ref: forwardedRef,
        onClick: composeEventHandlers(props.onClick, () => context.onOpenChange(false))
      }
    );
  }
);
PopoverClose.displayName = CLOSE_NAME;
var ARROW_NAME = "PopoverArrow";
var PopoverArrow = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopePopover, ...arrowProps } = props;
    const popperScope = usePopperScope(__scopePopover);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Arrow, { ...popperScope, ...arrowProps, ref: forwardedRef });
  }
);
PopoverArrow.displayName = ARROW_NAME;
function getState(open) {
  return open ? "open" : "closed";
}
var Root2 = Popover$1;
var Trigger = PopoverTrigger$1;
var Portal = PopoverPortal;
var Content2 = PopoverContent$1;
function Popover({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2, { "data-slot": "popover", ...props });
}
function PopoverTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger, { "data-slot": "popover-trigger", ...props });
}
function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content2,
    {
      "data-slot": "popover-content",
      align,
      sideOffset,
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
        className
      ),
      ...props
    }
  ) });
}
const US_STATES = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" }
];
const STATE_PATHS = {
  AL: "M 520 370 L 540 370 L 543 430 L 535 440 L 520 430 Z",
  AK: "M 120 460 L 185 460 L 195 490 L 180 510 L 155 515 L 130 505 L 110 490 Z",
  AZ: "M 195 330 L 250 330 L 255 400 L 200 400 Z",
  AR: "M 490 360 L 520 360 L 520 395 L 490 395 Z",
  CA: "M 130 260 L 175 250 L 185 290 L 190 340 L 175 380 L 155 380 L 140 340 L 130 300 Z",
  CO: "M 255 295 L 330 295 L 330 340 L 255 340 Z",
  CT: "M 660 225 L 675 225 L 675 245 L 660 245 Z",
  DE: "M 653 255 L 663 255 L 663 278 L 653 278 Z",
  FL: "M 535 435 L 580 435 L 600 455 L 610 490 L 580 510 L 555 500 L 540 480 L 530 460 Z",
  GA: "M 540 375 L 570 375 L 575 430 L 555 440 L 535 435 L 535 400 Z",
  HI: "M 230 510 L 310 510 L 310 535 L 230 535 Z",
  ID: "M 195 195 L 235 195 L 240 250 L 230 265 L 210 270 L 200 250 Z",
  IL: "M 505 285 L 525 285 L 525 360 L 505 360 Z",
  IN: "M 530 280 L 550 280 L 550 340 L 530 340 Z",
  IA: "M 450 255 L 505 255 L 505 285 L 450 285 Z",
  KS: "M 360 315 L 450 315 L 450 350 L 360 350 Z",
  KY: "M 520 335 L 590 330 L 595 355 L 520 360 Z",
  LA: "M 470 415 L 510 415 L 515 445 L 495 455 L 470 450 Z",
  ME: "M 690 155 L 715 155 L 720 195 L 700 200 L 685 190 Z",
  MD: "M 618 268 L 655 263 L 658 278 L 630 285 L 618 278 Z",
  MA: "M 660 210 L 710 208 L 715 225 L 675 225 L 660 225 Z",
  MI: "M 530 215 L 570 215 L 575 255 L 560 265 L 545 260 L 530 250 Z",
  MN: "M 430 185 L 490 185 L 495 250 L 450 255 L 430 245 Z",
  MS: "M 500 370 L 520 370 L 520 435 L 500 435 Z",
  MO: "M 455 310 L 510 305 L 515 360 L 455 360 Z",
  MT: "M 215 175 L 335 175 L 335 220 L 250 225 L 215 215 Z",
  NE: "M 355 265 L 450 265 L 450 300 L 355 305 Z",
  NV: "M 170 255 L 210 250 L 215 325 L 195 335 L 165 320 Z",
  NH: "M 668 185 L 682 185 L 685 220 L 668 222 Z",
  NJ: "M 648 248 L 662 245 L 665 272 L 650 275 Z",
  NM: "M 255 340 L 310 340 L 315 405 L 255 405 Z",
  NY: "M 605 215 L 660 208 L 665 240 L 648 250 L 605 245 Z",
  NC: "M 565 340 L 640 335 L 645 360 L 565 365 Z",
  ND: "M 350 185 L 430 185 L 430 220 L 350 220 Z",
  OH: "M 555 270 L 595 268 L 598 315 L 555 318 Z",
  OK: "M 360 350 L 475 348 L 478 385 L 360 385 Z",
  OR: "M 135 210 L 200 205 L 205 255 L 170 260 L 135 255 Z",
  PA: "M 595 238 L 650 235 L 653 265 L 598 268 Z",
  RI: "M 678 228 L 688 228 L 688 243 L 678 243 Z",
  SC: "M 568 368 L 605 362 L 612 390 L 580 400 L 562 390 Z",
  SD: "M 350 220 L 430 218 L 432 262 L 355 265 Z",
  TN: "M 510 355 L 590 348 L 592 368 L 510 372 Z",
  TX: "M 315 355 L 465 350 L 470 445 L 410 480 L 360 475 L 315 440 Z",
  UT: "M 215 295 L 258 295 L 260 355 L 215 358 Z",
  VT: "M 656 182 L 668 182 L 668 222 L 656 222 Z",
  VA: "M 580 290 L 645 283 L 648 310 L 595 318 L 575 308 Z",
  WA: "M 140 170 L 210 165 L 213 205 L 145 208 Z",
  WV: "M 580 280 L 615 275 L 620 305 L 598 318 L 578 308 Z",
  WI: "M 480 200 L 520 200 L 525 255 L 490 260 L 478 245 Z",
  WY: "M 250 235 L 335 230 L 337 285 L 253 290 Z"
};
const STATE_LABEL_POS = {
  AL: [531, 402],
  AK: [153, 488],
  AZ: [225, 367],
  AR: [505, 379],
  CA: [158, 315],
  CO: [292, 318],
  CT: [667, 235],
  DE: [658, 267],
  FL: [565, 472],
  GA: [553, 405],
  HI: [268, 523],
  ID: [217, 233],
  IL: [515, 322],
  IN: [540, 310],
  IA: [477, 270],
  KS: [405, 333],
  KY: [557, 345],
  LA: [490, 435],
  ME: [700, 178],
  MD: [636, 274],
  MA: [687, 217],
  MI: [552, 240],
  MN: [462, 218],
  MS: [510, 403],
  MO: [483, 333],
  MT: [275, 198],
  NE: [402, 283],
  NV: [188, 292],
  NH: [675, 203],
  NJ: [656, 260],
  NM: [283, 373],
  NY: [632, 228],
  NC: [605, 350],
  ND: [390, 203],
  OH: [576, 293],
  OK: [418, 367],
  OR: [168, 233],
  PA: [622, 252],
  RI: [683, 236],
  SC: [585, 382],
  SD: [391, 243],
  TN: [550, 362],
  TX: [390, 415],
  UT: [237, 327],
  VT: [662, 202],
  VA: [612, 300],
  WA: [175, 188],
  WV: [598, 295],
  WI: [500, 228],
  WY: [293, 262]
};
function statusFill(status) {
  switch (status) {
    case TravelStatus.visited:
      return "oklch(0.72 0.17 70)";
    case TravelStatus.lived_in:
      return "oklch(0.58 0.14 190)";
    case TravelStatus.wishlisted:
      return "oklch(0.75 0.16 85)";
    default:
      return "oklch(0.22 0.02 50)";
  }
}
function statusStroke(status) {
  return status ? "oklch(0.14 0.015 50)" : "oklch(0.30 0.02 50)";
}
const STATUS_ACTIONS = [
  {
    label: "Visited",
    status: TravelStatus.visited,
    Icon: MapPin,
    color: "text-amber-400"
  },
  {
    label: "Lived In",
    status: TravelStatus.lived_in,
    Icon: House,
    color: "text-teal-400"
  },
  {
    label: "Wishlist",
    status: TravelStatus.wishlisted,
    Icon: Star,
    color: "text-yellow-400"
  }
];
function StatePopover({
  stateName,
  currentStatus,
  onSet,
  onRemove,
  open,
  onOpenChange,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { open, onOpenChange, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      PopoverContent,
      {
        className: "w-52 p-3 bg-card border-border",
        "data-ocid": "state.popover",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm text-foreground", children: stateName }),
            currentStatus && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "text-xs px-1.5 py-0",
                style: {
                  borderColor: statusFill(currentStatus),
                  color: statusFill(currentStatus)
                },
                children: currentStatus === TravelStatus.lived_in ? "Lived In" : currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            STATUS_ACTIONS.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  onSet(a.status);
                  onOpenChange(false);
                },
                className: `flex items-center gap-2 w-full px-2 py-1.5 rounded-md text-xs font-medium transition-smooth hover:bg-muted ${currentStatus === a.status ? "bg-muted" : ""} ${a.color}`,
                "data-ocid": "state.status_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(a.Icon, { className: "h-3.5 w-3.5" }),
                  a.label
                ]
              },
              a.status
            )),
            currentStatus && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  onRemove();
                  onOpenChange(false);
                },
                className: "flex items-center gap-2 w-full px-2 py-1.5 rounded-md text-xs font-medium text-muted-foreground hover:text-destructive-foreground hover:bg-destructive/20 transition-smooth",
                "data-ocid": "state.remove_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }),
                  "Remove"
                ]
              }
            )
          ] })
        ]
      }
    )
  ] });
}
function SummaryChip({
  icon,
  label,
  count,
  total,
  color,
  bg,
  border
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `flex items-center gap-2 px-4 py-2.5 rounded-xl border ${bg} ${border}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: color, children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `font-display text-lg font-bold leading-none ${color}`, children: count }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: [
            label,
            " / ",
            total
          ] })
        ] })
      ]
    }
  );
}
function LegendItem({ color, label }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "inline-block w-3 h-3 rounded-sm",
        style: { background: color, border: "1px solid oklch(0.30 0.02 50)" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label })
  ] });
}
function StatesPage() {
  const { data: stateEntries = [] } = useListStates();
  const setStateMut = useSetState();
  const removeStateMut = useRemoveState();
  const [openState, setOpenState] = reactExports.useState(null);
  const statusMap = reactExports.useMemo(() => {
    const map = {};
    for (const e of stateEntries) map[e.code] = e.status;
    return map;
  }, [stateEntries]);
  const visited = stateEntries.filter(
    (e) => e.status === TravelStatus.visited
  ).length;
  const livedIn = stateEntries.filter(
    (e) => e.status === TravelStatus.lived_in
  ).length;
  const wishlisted = stateEntries.filter(
    (e) => e.status === TravelStatus.wishlisted
  ).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6 p-6", "data-ocid": "states.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "US States" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Click any state to mark it as visited, lived in, or wishlisted" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", "data-ocid": "states.summary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SummaryChip,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4" }),
          label: "Visited",
          count: visited,
          total: 50,
          color: "text-amber-400",
          bg: "bg-amber-400/10",
          border: "border-amber-400/20"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SummaryChip,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "h-4 w-4" }),
          label: "Lived In",
          count: livedIn,
          total: 50,
          color: "text-teal-400",
          bg: "bg-teal-400/10",
          border: "border-teal-400/20"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SummaryChip,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4" }),
          label: "Wishlist",
          count: wishlisted,
          total: 50,
          color: "text-yellow-400",
          bg: "bg-yellow-400/10",
          border: "border-yellow-400/20"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SummaryChip,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base leading-none", children: "🗺️" }),
          label: "Tracked",
          count: visited + livedIn + wishlisted,
          total: 50,
          color: "text-foreground",
          bg: "bg-muted",
          border: "border-border"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "bg-card rounded-2xl border border-border p-4 overflow-hidden",
        "data-ocid": "states.map",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            viewBox: "80 150 900 420",
            className: "w-full",
            style: { maxHeight: 520 },
            "aria-label": "Map of US states",
            role: "img",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Map of US states" }),
              US_STATES.map((state) => {
                const path = STATE_PATHS[state.code];
                if (!path) return null;
                const status = statusMap[state.code];
                const fill = statusFill(status);
                const stroke = statusStroke(status);
                const labelPos = STATE_LABEL_POS[state.code];
                const isOpen = openState === state.code;
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  StatePopover,
                  {
                    stateCode: state.code,
                    stateName: state.name,
                    currentStatus: status,
                    onSet: (s) => setStateMut.mutate({ code: state.code, status: s }),
                    onRemove: () => removeStateMut.mutate(state.code),
                    open: isOpen,
                    onOpenChange: (v) => setOpenState(v ? state.code : null),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "g",
                      {
                        tabIndex: 0,
                        role: "button",
                        "aria-label": `${state.name}${status ? ` — ${status}` : ""}`,
                        className: "cursor-pointer focus:outline-none",
                        "data-ocid": `states.state.${state.code.toLowerCase()}`,
                        style: { outline: "none" },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: path,
                              fill,
                              stroke,
                              strokeWidth: isOpen ? 2 : 1,
                              style: {
                                filter: isOpen ? `drop-shadow(0 0 6px ${fill})` : void 0,
                                transition: "fill 0.2s ease, stroke-width 0.15s ease"
                              }
                            }
                          ),
                          labelPos && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "text",
                            {
                              x: labelPos[0],
                              y: labelPos[1],
                              textAnchor: "middle",
                              dominantBaseline: "middle",
                              fontSize: 9,
                              fontFamily: "var(--font-body)",
                              fontWeight: 600,
                              fill: status ? "oklch(0.14 0.015 50)" : "oklch(0.55 0.012 55)",
                              style: { pointerEvents: "none", userSelect: "none" },
                              children: state.code
                            }
                          )
                        ]
                      }
                    )
                  },
                  state.code
                );
              })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-wrap items-center gap-4 text-xs text-muted-foreground",
        "data-ocid": "states.legend",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-foreground/50 uppercase tracking-widest text-[10px]", children: "Legend" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(LegendItem, { color: "oklch(0.72 0.17 70)", label: "Visited" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(LegendItem, { color: "oklch(0.58 0.14 190)", label: "Lived In" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(LegendItem, { color: "oklch(0.75 0.16 85)", label: "Wishlist" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(LegendItem, { color: "oklch(0.22 0.02 50)", label: "Not tracked" })
        ]
      }
    )
  ] });
}
export {
  US_STATES,
  StatesPage as default
};
