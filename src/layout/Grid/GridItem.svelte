<script>
  import { getContext } from "svelte";

  export let id = null;
  let className = null;
  export { className as class };

  export let span = null;
  export let smspan = null;
  export let mdspan = null;
  export let lgspan = null;
  export let xlspan = null;

  // TODO: Order doesn't work in CSS grid
  //export let order = null;
  //export let smorder = null;
  //export let mdorder = null;
  //export let lgorder = null;
  //export let xlorder = null;
</script>

<div
  {id}
  class={[
    "grid-item",
    span ? "span-" + span : null,
    smspan ? "sm-span-" + smspan : null,
    mdspan ? "md-span-" + mdspan : null,
    lgspan ? "lg-span-" + lgspan : null,
    xlspan ? "xl-span-" + xlspan : null,
    //order ? 'order-' + order : null,
    //smorder ? 'sm-order-' + smorder : null,
    //mdorder ? 'md-order-' + mdorder : null,
    //lgorder ? 'lg-order-' + lgorder : null,
    //xlorder ? 'xl-order-' + xlorder : null,
    className,
  ]
    .filter(Boolean)
    .join(" ")}
>
  <slot />
</div>

<!-- HACK: global because we're putting classes together with strings -->
<style>
  /* These styles were automatically generated from GridItem.scss */
  .grid-item {
    overflow: auto;
  }

  :global(.grid-item.span-1) {
    grid-column: span 1;
  }

  :global(.grid-item.span-2) {
    grid-column: span 2;
  }

  :global(.grid-item.span-3) {
    grid-column: span 3;
  }

  :global(.grid-item.span-4) {
    grid-column: span 4;
  }

  :global(.grid-item.span-5) {
    grid-column: span 5;
  }

  :global(.grid-item.span-6) {
    grid-column: span 6;
  }

  :global(.grid-item.span-7) {
    grid-column: span 7;
  }

  :global(.grid-item.span-8) {
    grid-column: span 8;
  }

  :global(.grid-item.span-9) {
    grid-column: span 9;
  }

  :global(.grid-item.span-10) {
    grid-column: span 10;
  }

  :global(.grid-item.span-11) {
    grid-column: span 11;
  }

  :global(.grid-item.span-12) {
    grid-column: span 12;
  }

  @media (min-width: 480px) {
    :global(.grid-item.sm-span-0) {
      grid-column: span 0;
    }
    :global(.grid-item.sm-span-1) {
      grid-column: span 1;
    }
    :global(.grid-item.sm-span-2) {
      grid-column: span 2;
    }
    :global(.grid-item.sm-span-3) {
      grid-column: span 3;
    }
    :global(.grid-item.sm-span-4) {
      grid-column: span 4;
    }
    :global(.grid-item.sm-span-5) {
      grid-column: span 5;
    }
    :global(.grid-item.sm-span-6) {
      grid-column: span 6;
    }
    :global(.grid-item.sm-span-7) {
      grid-column: span 7;
    }
    :global(.grid-item.sm-span-8) {
      grid-column: span 8;
    }
    :global(.grid-item.sm-span-9) {
      grid-column: span 9;
    }
    :global(.grid-item.sm-span-10) {
      grid-column: span 10;
    }
    :global(.grid-item.sm-span-11) {
      grid-column: span 11;
    }
    :global(.grid-item.sm-span-12) {
      grid-column: span 12;
    }
  }

  @media (min-width: 760px) {
    :global(.grid-item.md-span-0) {
      grid-column: span 0;
    }
    :global(.grid-item.md-span-1) {
      grid-column: span 1;
    }
    :global(.grid-item.md-span-2) {
      grid-column: span 2;
    }
    :global(.grid-item.md-span-3) {
      grid-column: span 3;
    }
    :global(.grid-item.md-span-4) {
      grid-column: span 4;
    }
    :global(.grid-item.md-span-5) {
      grid-column: span 5;
    }
    :global(.grid-item.md-span-6) {
      grid-column: span 6;
    }
    :global(.grid-item.md-span-7) {
      grid-column: span 7;
    }
    :global(.grid-item.md-span-8) {
      grid-column: span 8;
    }
    :global(.grid-item.md-span-9) {
      grid-column: span 9;
    }
    :global(.grid-item.md-span-10) {
      grid-column: span 10;
    }
    :global(.grid-item.md-span-11) {
      grid-column: span 11;
    }
    :global(.grid-item.md-span-12) {
      grid-column: span 12;
    }
  }

  @media (min-width: 1040px) {
    :global(.grid-item.lg-span-0) {
      grid-column: span 0;
    }
    :global(.grid-item.lg-span-1) {
      grid-column: span 1;
    }
    :global(.grid-item.lg-span-2) {
      grid-column: span 2;
    }
    :global(.grid-item.lg-span-3) {
      grid-column: span 3;
    }
    :global(.grid-item.lg-span-4) {
      grid-column: span 4;
    }
    :global(.grid-item.lg-span-5) {
      grid-column: span 5;
    }
    :global(.grid-item.lg-span-6) {
      grid-column: span 6;
    }
    :global(.grid-item.lg-span-7) {
      grid-column: span 7;
    }
    :global(.grid-item.lg-span-8) {
      grid-column: span 8;
    }
    :global(.grid-item.lg-span-9) {
      grid-column: span 9;
    }
    :global(.grid-item.lg-span-10) {
      grid-column: span 10;
    }
    :global(.grid-item.lg-span-11) {
      grid-column: span 11;
    }
    :global(.grid-item.lg-span-12) {
      grid-column: span 12;
    }
  }

  @media (min-width: 1320px) {
    :global(.grid-item.xl-span-0) {
      grid-column: span 0;
    }
    :global(.grid-item.xl-span-1) {
      grid-column: span 1;
    }
    :global(.grid-item.xl-span-2) {
      grid-column: span 2;
    }
    :global(.grid-item.xl-span-3) {
      grid-column: span 3;
    }
    :global(.grid-item.xl-span-4) {
      grid-column: span 4;
    }
    :global(.grid-item.xl-span-5) {
      grid-column: span 5;
    }
    :global(.grid-item.xl-span-6) {
      grid-column: span 6;
    }
    :global(.grid-item.xl-span-7) {
      grid-column: span 7;
    }
    :global(.grid-item.xl-span-8) {
      grid-column: span 8;
    }
    :global(.grid-item.xl-span-9) {
      grid-column: span 9;
    }
    :global(.grid-item.xl-span-10) {
      grid-column: span 10;
    }
    :global(.grid-item.xl-span-11) {
      grid-column: span 11;
    }
    :global(.grid-item.xl-span-12) {
      grid-column: span 12;
    }
  }
</style>
