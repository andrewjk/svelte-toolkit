<style>
  /* These styles were automatically generated from Toolkit.scss */
  /* 
  The _variables file contains Sass variables for colors and sizes, among other things, which you
  can use to customize styles
  */
  /*
  The base file contains styles for elements such as text and headings
  */
  :global(*, *:before, *:after) {
    box-sizing: border-box;
  }

  /* NOTE: 62.5% ensures that 1rem = 10px */
  :global(html) {
    font-size: 62.5%;
  }

  :global(body) {
    background-color: var(--body-back-color, #fff);
    color: var(--body-text-color, #222);
    font-family: sans-serif;
    font-size: var(--font-size, 1.4rem);
    line-height: var(--line-height, 1.4);
    margin: 0;
  }

  :global(a) {
    color: var(--link-color, #0265b7);
    text-decoration: none;
  }

  :global(a:hover),
  :global(a:focus) {
    color: var(--link-hover-color, #0265b7);
    outline: 0;
    text-decoration: underline;
  }

  :global(hr) {
    background-color: var(--border-color, #d2d2d2);
    border: 0;
    color: var(--border-color, #d2d2d2);
    height: 1px;
    margin: var(--element-margin, 1.5rem) 0;
    width: 100%;
  }

  :global(p),
  :global(ol),
  :global(ul),
  :global(dl),
  :global(blockquote),
  :global(pre),
  :global(code),
  :global(address),
  :global(fieldset),
  :global(figure),
  :global(table) {
    margin: 0 0 var(--element-margin, 1.5rem);
  }

  :global(p:last-child),
  :global(ol:last-child),
  :global(ul:last-child),
  :global(dl:last-child),
  :global(blockquote:last-child),
  :global(pre:last-child),
  :global(address:last-child),
  :global(fieldset:last-child),
  :global(figure:last-child),
  :global(table) {
    margin-bottom: 0;
  }

  :global(ol),
  :global(ul) {
    padding-left: var(--element-margin, 1.5rem);
  }

  :global(li) {
    margin: calc(var(--element-margin, 1.5rem) / 2) 0;
    padding-left: calc(var(--element-margin, 1.5rem) / 4);
  }

  :global(ol) :global(ol),
  :global(ol) :global(ul),
  :global(ul) :global(ol),
  :global(ul) :global(ul) {
    margin: calc(var(--element-margin, 1.5rem) / 2) 0;
  }

  :global(img) {
    vertical-align: top;
  }

  :global(mark) {
    background-color: var(--mark-back-color, #ffff00);
    color: var(--mark-text-color, #222);
    padding: 2px 5px;
  }

  :global(button),
  :global(input),
  :global(optgroup),
  :global(select),
  :global(textarea) {
    color: inherit;
    font-size: inherit;
    font-family: inherit;
    font-weight: inherit;
    line-height: inherit;
  }

  :global(button.link) {
    background-color: transparent;
    border: none;
    color: var(--link-color, #0265b7);
    cursor: pointer;
    display: inline-flex;
    padding: 0;
    text-align: left;
  }

  :global(button.link:hover),
  :global(button.link:focus) {
    color: var(--link-hover-color, #0265b7);
    text-decoration: underline;
  }

  :global(h1),
  :global(h2),
  :global(h3),
  :global(h4),
  :global(h5),
  :global(h6) {
    font-weight: normal;
    margin: 0 0 var(--element-margin, 1.5rem);
    text-transform: none;
  }

  :global(h1:last-child),
  :global(h2:last-child),
  :global(h3:last-child),
  :global(h4:last-child),
  :global(h5:last-child),
  :global(h6:last-child) {
    margin-bottom: 0;
  }

  :global(h1) {
    font-size: 3.2rem;
    line-height: 1.25;
  }

  :global(h2) {
    font-size: 2.6rem;
    line-height: 1.3;
  }

  :global(h3) {
    font-size: 2.2rem;
    line-height: 1.35;
  }

  :global(h4) {
    font-size: 1.8rem;
    line-height: 1.5;
  }

  :global(h5) {
    font-size: 1.5rem;
    line-height: 1.6;
  }

  :global(h6) {
    font-size: 1.4rem;
    line-height: 1.4;
  }

  /*
  The layout file contains styles for laying out the page, including styles for headers, mains,
  footers and containers
  */
  :global(.block) {
    margin: 0 0 var(--element-margin, 1.5rem);
  }

  :global(.block:last-child) {
    margin-bottom: 0;
  }

  :global(.center) {
    margin-left: auto;
    margin-right: auto;
  }

  :global(.full-width) {
    width: 100%;
  }

  :global(.clearfix) {
    overflow: auto;
  }

  :global(.text-left) {
    text-align: left !important;
  }

  :global(.text-center) {
    text-align: center !important;
  }

  :global(.text-right) {
    text-align: right !important;
  }

  :global(.align-left) {
    display: block !important;
    float: left !important;
    margin-right: var(--element-margin, 1.5rem) !important;
  }

  :global(.align-right) {
    display: block !important;
    float: right !important;
    margin-left: var(--element-margin, 1.5rem) !important;
  }

  :global(.align-center) {
    display: block !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }

  :global(.vertical-align-top) {
    display: flex !important;
    align-items: top;
  }

  :global(.vertical-align-middle) {
    display: flex !important;
    align-items: center;
  }

  :global(.vertical-align-bottom) {
    display: flex !important;
    align-items: bottom;
  }

  :global(small),
  :global(.text-small) {
    font-size: var(--font-size-small, 1.1rem) !important;
  }

  :global(.text-large) {
    font-size: var(--font-size-large, 1.7rem) !important;
  }

  :global(.no-margin) {
    margin: 0 !important;
  }

  :global(.no-margin-top) {
    margin-top: 0 !important;
  }

  :global(.no-margin-right) {
    margin-right: 0 !important;
  }

  :global(.no-margin-bottom) {
    margin-bottom: 0 !important;
  }

  :global(.no-margin-left) {
    margin-left: 0 !important;
  }

  :global(.margin) {
    margin: var(--element-margin, 1.5rem) !important;
  }

  :global(.margin-h) {
    margin: 0 var(--element-margin, 1.5rem) !important;
  }

  :global(.margin-v) {
    margin: var(--element-margin, 1.5rem) 0 !important;
  }

  :global(.margin-top) {
    margin-top: var(--element-margin, 1.5rem) !important;
  }

  :global(.margin-right) {
    margin-right: var(--element-margin, 1.5rem) !important;
  }

  :global(.margin-bottom) {
    margin-bottom: var(--element-margin, 1.5rem) !important;
  }

  :global(.margin-left) {
    margin-left: var(--element-margin, 1.5rem) !important;
  }

  :global(.no-padding) {
    padding: 0 !important;
  }

  :global(.no-padding-top) {
    padding-top: 0 !important;
  }

  :global(.no-padding-right) {
    padding-right: 0 !important;
  }

  :global(.no-padding-bottom) {
    padding-bottom: 0 !important;
  }

  :global(.no-padding-left) {
    padding-left: 0 !important;
  }

  :global(.padding) {
    padding: var(--element-padding, 2rem) !important;
  }

  :global(.padding-h) {
    padding: 0 var(--element-padding, 2rem) !important;
  }

  :global(.padding-v) {
    padding: var(--element-padding, 2rem) 0 !important;
  }

  :global(.padding-top) {
    padding-top: var(--element-padding, 2rem) !important;
  }

  :global(.padding-right) {
    padding-right: var(--element-padding, 2rem) !important;
  }

  :global(.padding-bottom) {
    padding-bottom: var(--element-padding, 2rem) !important;
  }

  :global(.padding-left) {
    padding-left: var(--element-padding, 2rem) !important;
  }

  @media (max-width: 479px) {
    :global(.visible-small),
    :global(.visible-medium),
    :global(.visible-large),
    :global(.visible-xlarge) {
      display: none !important;
    }
  }

  @media (min-width: 480px) and (max-width: 759px) {
    :global(.hidden-small) {
      display: none !important;
    }
    :global(.visible-medium:not(.visible-small)),
    :global(.visible-large:not(.visible-small)),
    :global(.visible-xlarge:not(.visible-small)) {
      display: none !important;
    }
    :global(.visible-small) {
      visibility: visible !important;
    }
  }

  @media (min-width: 760px) and (max-width: 1039px) {
    :global(.hidden-small:not(.visible-medium)) {
      display: none !important;
    }
    :global(.hidden-medium) {
      display: none !important;
    }
    :global(.visible-large:not(.visible-medium)),
    :global(.visible-xlarge:not(.visible-medium)) {
      display: none !important;
    }
    :global(.visible-medium),
    :global(.visible-large),
    :global(.visible-xlarge) {
      visibility: visible !important;
    }
  }

  @media (min-width: 1040px) and (max-width: 1319px) {
    :global(.hidden-small:not(.visible-large)),
    :global(.hidden-medium:not(.visible-large)) {
      display: none !important;
    }
    :global(.hidden-large) {
      display: none !important;
    }
    :global(.visible-xlarge:not(.visible-large)) {
      display: none !important;
    }
    :global(.visible-large),
    :global(.visible-xlarge) {
      visibility: visible !important;
    }
  }

  @media (min-width: 1320px) {
    :global(.hidden-small:not(.visible-xlarge)),
    :global(.hidden-medium:not(.visible-xlarge)),
    :global(.hidden-large:not(.visible-xlarge)) {
      display: none !important;
    }
    :global(.hidden-xlarge) {
      display: none !important;
    }
    :global(.visible-xlarge) {
      visibility: visible !important;
    }
  }

  :global(.hidden) {
    display: none !important;
    visibility: hidden !important;
  }

  :global(.visible) {
    display: block !important;
    visibility: visible !important;
  }

  @media print {
    :global(.no-print),
    :global(.no-print *) {
      display: none !important;
    }
  }

  /*
  The forms file contains styles for basic form elements
  */
  :global(label) {
    color: var(--label-text-color, #777);
    display: block;
    line-height: var(--input-height, 3.2rem);
    padding-left: 1px;
  }

  :global(label.inline) {
    line-height: var(--input-height, 3.2rem);
    margin-right: calc(var(--element-margin, 1.5rem) / 2);
  }

  :global(input[type="text"]),
  :global(input[type="password"]),
  :global(input[type="email"]),
  :global(input[type="number"]),
  :global(input[type="datetime"]),
  :global(input[type="file"]),
  :global(input[type="url"]) {
    -webkit-appearance: none;
    background-color: var(--input-back-color, #fff);
    border: 1px solid var(--border-color, #d2d2d2);
    border-radius: var(--border-radius, 2px);
    color: var(--input-text-color, #000);
    height: var(--input-height, 3.2rem);
    padding: 0 4px;
    width: 100%;
  }

  :global(input[type="file"]) {
    padding: 0;
  }

  :global(input[type="checkbox"]),
  :global(input[type="radio"]) {
    line-height: var(--input-height, 3.2rem);
    margin: 0 5px;
  }

  :global(input[type="submit"]::-moz-focus-inner) {
    border: none;
  }

  :global(input[readonly]),
  :global(input:disabled),
  :global(textarea[readonly]),
  :global(textarea:disabled),
  :global(input[type="submit"]:disabled),
  :global(input[type="submit"]:disabled:hover),
  :global(input[type="submit"]:disabled:focus) {
    background-color: var(--disabled-color, #f2f2f2);
    color: var(--disabled-text-color, #c2c2c2);
  }

  :global(input[type="range"]) {
    height: var(--input-height, 3.2rem);
    width: 100%;
  }

  :global(input.small) {
    width: 100px;
  }

  :global(input.medium) {
    width: 200px;
  }

  :global(input.large) {
    width: 280px;
    max-width: 100%;
  }

  :global(input.inline) {
    line-height: var(--input-height, 3.2rem);
    margin-right: calc(var(--element-margin, 1.5rem) / 2);
    width: auto;
  }

  :global(select) {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    background-color: var(--input-back-color, #fff);
    background-image: url('data:image/svg+xml; utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g><path d="M10,30 L50,70 L90,30" fill="none" stroke="%23777" stroke-width="15" /></g></svg>');
    background-repeat: no-repeat, repeat;
    background-position: right 0.6rem top 50%, 0 0;
    background-size: 1.1rem auto, 100%;
    border: 1px solid var(--border-color, #d2d2d2);
    border-radius: var(--border-radius, 2px);
    color: var(--input-text-color, #000);
    height: var(--input-height, 3.2rem);
    padding: 0 4px;
    width: 100%;
  }

  :global(select:not([multiple])) {
    height: var(--input-height, 3.2rem);
  }

  /* Remove the black dotted focus border in Firefox
     per https://stackoverflow.com/a/27510551 */
  :global(select:-moz-focusring) {
    color: transparent;
    text-shadow: 0 0 0 var(--body-text-color, #222);
  }

  :global(select:-moz-focusring *) {
    color: var(--body-text-color, #222);
    text-shadow: none;
  }

  :global(select.inline) {
    line-height: var(--input-height, 3.2rem);
    margin-right: calc(var(--element-margin, 1.5rem) / 2);
    width: auto;
  }

  :global(textarea) {
    background-color: var(--input-back-color, #fff);
    border: 1px solid var(--border-color, #d2d2d2);
    border-radius: var(--border-radius, 2px);
    color: var(--input-text-color, #000);
    font-size: inherit;
    margin: 0;
    /* Roughly enough for two rows at default sizing: */
    min-height: 56px;
    padding: 4px;
    width: 100%;
  }

  :global(textarea[readonly]) :global(textarea:disabled) {
    background-color: var(--disabled-color, #f2f2f2);
  }

  :global(fieldset) {
    border: 1px solid var(--border-color, #d2d2d2);
    border-radius: var(--border-radius, 2px);
    padding: var(--element-padding, 2rem);
  }

  :global(legend) {
    color: var(--label-text-color, #777);
    padding: 0 calc(var(--element-padding, 2rem) / 4);
  }

  :global(input:focus),
  :global(select:focus),
  :global(textarea:focus) {
    border: 1px solid var(--focus-color, #8fc5ff);
    box-shadow: 0px 0px 1px var(--select-color, #3396ff);
    outline: none;
  }

  :global(input[readonly]:focus),
  :global(input:disabled:focus),
  :global(textarea[readonly]:focus),
  :global(textarea:disabled:focus) {
    border: 1px solid var(--border-color, #d2d2d2);
    box-shadow: 0px 0px 1px var(--border-color, #d2d2d2);
  }

  :global(input.primary),
  :global(select.primary),
  :global(textarea.primary) {
    border-color: var(--primary-color, #fd3f92);
  }

  :global(input.primary:focus),
  :global(select.primary:focus),
  :global(textarea.primary:focus) {
    box-shadow: 0px 0px 2px var(--primary-color, #fd3f92);
  }

  :global(input.info),
  :global(select.info),
  :global(textarea.info) {
    border-color: var(--info-color, #4d90fe);
  }

  :global(input.info:focus),
  :global(select.info:focus),
  :global(textarea.info:focus) {
    box-shadow: 0px 0px 2px var(--info-color, #4d90fe);
  }

  :global(input.success),
  :global(select.success),
  :global(textarea.success) {
    border-color: var(--success-color, #00a852);
  }

  :global(input.success:focus),
  :global(select.success:focus),
  :global(textarea.success:focus) {
    box-shadow: 0px 0px 2px var(--success-color, #00a852);
  }

  :global(input.warning),
  :global(select.warning),
  :global(textarea.warning) {
    border-color: var(--warning-color, #f3c42e);
  }

  :global(input.warning:focus),
  :global(select.warning:focus),
  :global(textarea.warning:focus) {
    box-shadow: 0px 0px 2px var(--warning-color, #f3c42e);
  }

  :global(input.danger),
  :global(select.danger),
  :global(textarea.danger) {
    border-color: var(--danger-color, #ee2e24);
  }

  :global(input.danger:focus),
  :global(select.danger:focus),
  :global(textarea.danger:focus) {
    box-shadow: 0px 0px 2px var(--danger-color, #ee2e24);
  }
</style>
