# jekyll-sitemap lists future-dated documents in custom collections (_ko) even
# though Jekyll does not render them yet, so the sitemap would point at a 404
# until the publication day. Drop them from the sitemap until their date; the
# daily scheduled deploy picks them up on the day.
module FutureSitemapExclude
  class Generator < Jekyll::Generator
    safe true
    priority :low

    def generate(site)
      return if site.future

      site.collections.each_value do |coll|
        coll.docs.each do |doc|
          doc.data["sitemap"] = false if doc.date && doc.date > site.time
        end
      end
    end
  end
end
