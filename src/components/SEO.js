import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

export default function SEO({ children, location, description, title, image }) {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          twitter
        }
      }
    }
  `);

  return (
    <Helmet titleTemplate={`%s - ${site.siteMetadata.title}`}>
      <html lang="en" />
      <title>{title}</title>
      {/* Fav Icons */}
      <link rel="icon" type="image/svg+xml" href="/static/favicon.svg" />
      <link rel="alternate icon" href="/static/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {/* <meta charSet="utf-8" /> */}
      <meta name="description" content={site.siteMetadata.description} />
      {/* Open Graph - specification for meta tags for things like Facebook, and Twitter and Instagram. 
      Basically any websites that want to gulp up info about your site */}
      {location && <meta property="og:url" content={location.href} />}
      <meta property="og:image" content={image || '/static/logo.svg'} />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta
        property="og: site_name"
        content={site.siteMetadata.title}
        key="ogsitename"
      />
      <meta property="og:description" content={description} key="ogdesc" />
      {children}
    </Helmet>
  );
}
