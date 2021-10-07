<script>
  import { setContext } from "svelte";

  export let id = null;
  let className = null;
  export { className as class };

  export let cols = null;
  export let smcols = null;
  export let mdcols = null;
  export let lgcols = null;
  export let xlcols = null;

  export let spaced = null;
</script>

<div
  {id}
  class={[
    "grid",
    spaced ? "spaced" : null,
    cols ? "cols-" + cols : null,
    smcols ? "sm-cols-" + smcols : null,
    mdcols ? "md-cols-" + mdcols : null,
    lgcols ? "lg-cols-" + lgcols : null,
    xlcols ? "xl-cols-" + xlcols : null,
    className,
  ]
    .filter(Boolean)
    .join(" ")}
>
  <slot />
</div>

<!-- HACK: global because we're putting classes together with strings -->
<style>
  /* These styles were automatically generated from Grid.scss */
  .grid {
    display: grid;
    margin: 0 0 var(--element-padding, 2rem);
    grid-template-columns: repeat(12, 1fr);
  }

  .grid:last-child {
    margin-bottom: 0;
  }

  .grid.spaced {
    row-gap: var(--element-padding, 2rem);
    column-gap: var(--element-padding, 2rem);
  }

  :global(.grid.cols-1) {
    grid-template-columns: repeat(1, 1fr);
  }

  :global(.grid.cols-2) {
    grid-template-columns: repeat(2, 1fr);
  }

  :global(.grid.cols-3) {
    grid-template-columns: repeat(3, 1fr);
  }

  :global(.grid.cols-4) {
    grid-template-columns: repeat(4, 1fr);
  }

  :global(.grid.cols-5) {
    grid-template-columns: repeat(5, 1fr);
  }

  :global(.grid.cols-6) {
    grid-template-columns: repeat(6, 1fr);
  }

  :global(.grid.cols-7) {
    grid-template-columns: repeat(7, 1fr);
  }

  :global(.grid.cols-8) {
    grid-template-columns: repeat(8, 1fr);
  }

  :global(.grid.cols-9) {
    grid-template-columns: repeat(9, 1fr);
  }

  :global(.grid.cols-10) {
    grid-template-columns: repeat(10, 1fr);
  }

  :global(.grid.cols-11) {
    grid-template-columns: repeat(11, 1fr);
  }

  :global(.grid.cols-12) {
    grid-template-columns: repeat(12, 1fr);
  }

  @media (min-width: 480px) {
    :global(.grid.sm-cols-1) {
      grid-template-columns: repeat(1, 1fr);
    }
    :global(.grid.sm-cols-2) {
      grid-template-columns: repeat(2, 1fr);
    }
    :global(.grid.sm-cols-3) {
      grid-template-columns: repeat(3, 1fr);
    }
    :global(.grid.sm-cols-4) {
      grid-template-columns: repeat(4, 1fr);
    }
    :global(.grid.sm-cols-5) {
      grid-template-columns: repeat(5, 1fr);
    }
    :global(.grid.sm-cols-6) {
      grid-template-columns: repeat(6, 1fr);
    }
    :global(.grid.sm-cols-7) {
      grid-template-columns: repeat(7, 1fr);
    }
    :global(.grid.sm-cols-8) {
      grid-template-columns: repeat(8, 1fr);
    }
    :global(.grid.sm-cols-9) {
      grid-template-columns: repeat(9, 1fr);
    }
    :global(.grid.sm-cols-10) {
      grid-template-columns: repeat(10, 1fr);
    }
    :global(.grid.sm-cols-11) {
      grid-template-columns: repeat(11, 1fr);
    }
    :global(.grid.sm-cols-12) {
      grid-template-columns: repeat(12, 1fr);
    }
  }

  @media (min-width: 760px) {
    :global(.grid.md-cols-1) {
      grid-template-columns: repeat(1, 1fr);
    }
    :global(.grid.md-cols-2) {
      grid-template-columns: repeat(2, 1fr);
    }
    :global(.grid.md-cols-3) {
      grid-template-columns: repeat(3, 1fr);
    }
    :global(.grid.md-cols-4) {
      grid-template-columns: repeat(4, 1fr);
    }
    :global(.grid.md-cols-5) {
      grid-template-columns: repeat(5, 1fr);
    }
    :global(.grid.md-cols-6) {
      grid-template-columns: repeat(6, 1fr);
    }
    :global(.grid.md-cols-7) {
      grid-template-columns: repeat(7, 1fr);
    }
    :global(.grid.md-cols-8) {
      grid-template-columns: repeat(8, 1fr);
    }
    :global(.grid.md-cols-9) {
      grid-template-columns: repeat(9, 1fr);
    }
    :global(.grid.md-cols-10) {
      grid-template-columns: repeat(10, 1fr);
    }
    :global(.grid.md-cols-11) {
      grid-template-columns: repeat(11, 1fr);
    }
    :global(.grid.md-cols-12) {
      grid-template-columns: repeat(12, 1fr);
    }
  }

  @media (min-width: 1040px) {
    :global(.grid.lg-cols-1) {
      grid-template-columns: repeat(1, 1fr);
    }
    :global(.grid.lg-cols-2) {
      grid-template-columns: repeat(2, 1fr);
    }
    :global(.grid.lg-cols-3) {
      grid-template-columns: repeat(3, 1fr);
    }
    :global(.grid.lg-cols-4) {
      grid-template-columns: repeat(4, 1fr);
    }
    :global(.grid.lg-cols-5) {
      grid-template-columns: repeat(5, 1fr);
    }
    :global(.grid.lg-cols-6) {
      grid-template-columns: repeat(6, 1fr);
    }
    :global(.grid.lg-cols-7) {
      grid-template-columns: repeat(7, 1fr);
    }
    :global(.grid.lg-cols-8) {
      grid-template-columns: repeat(8, 1fr);
    }
    :global(.grid.lg-cols-9) {
      grid-template-columns: repeat(9, 1fr);
    }
    :global(.grid.lg-cols-10) {
      grid-template-columns: repeat(10, 1fr);
    }
    :global(.grid.lg-cols-11) {
      grid-template-columns: repeat(11, 1fr);
    }
    :global(.grid.lg-cols-12) {
      grid-template-columns: repeat(12, 1fr);
    }
  }

  @media (min-width: 1320px) {
    :global(.grid.xl-cols-1) {
      grid-template-columns: repeat(1, 1fr);
    }
    :global(.grid.xl-cols-2) {
      grid-template-columns: repeat(2, 1fr);
    }
    :global(.grid.xl-cols-3) {
      grid-template-columns: repeat(3, 1fr);
    }
    :global(.grid.xl-cols-4) {
      grid-template-columns: repeat(4, 1fr);
    }
    :global(.grid.xl-cols-5) {
      grid-template-columns: repeat(5, 1fr);
    }
    :global(.grid.xl-cols-6) {
      grid-template-columns: repeat(6, 1fr);
    }
    :global(.grid.xl-cols-7) {
      grid-template-columns: repeat(7, 1fr);
    }
    :global(.grid.xl-cols-8) {
      grid-template-columns: repeat(8, 1fr);
    }
    :global(.grid.xl-cols-9) {
      grid-template-columns: repeat(9, 1fr);
    }
    :global(.grid.xl-cols-10) {
      grid-template-columns: repeat(10, 1fr);
    }
    :global(.grid.xl-cols-11) {
      grid-template-columns: repeat(11, 1fr);
    }
    :global(.grid.xl-cols-12) {
      grid-template-columns: repeat(12, 1fr);
    }
  }
</style>
