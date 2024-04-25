from bs4 import BeautifulSoup
import requests
import lxml

from urllib3.exceptions import InsecureRequestWarning

# Suppress only the single warning from urllib3 needed.
requests.packages.urllib3.disable_warnings(category=InsecureRequestWarning)

xml_dict = {}
baselink = "http://localhost:8080"

r = requests.get(f"{baselink}/sitemap.xml")
xml = r.text

soup = BeautifulSoup(xml, "lxml-xml")
sitemap_tags = soup.find_all("url")

print(f"The number of pages on the site is {len(sitemap_tags)}")

site_urls = []

for sitemap in sitemap_tags:
    site_urls.append(sitemap.findNext("loc").text)
    #xml_dict[sitemap.findNext("loc").text] = sitemap.findNext("lastmod").text


for url in site_urls:
    try:
        print(f"Checking: {url}")
        r = requests.get(url)
        html_content = r.text
        page_soup = BeautifulSoup(html_content, 'lxml')
        page_urls = [a.get('href') for a in page_soup.find_all('a', href=True)]
    except:
        print(f"Error checking {url}")

    
    for page_url in page_urls:
        if page_url.startswith('mailto:'):
            break
        if "localhost:4000" in page_url:
            break
        if "127.0.0.1:5000" in page_url:
            break
        if "localhost:8080/admin" in page_url:
            break
        if "/search" in page_url:
            break
        if page_url == '/':
            page_url = f"{baselink}"
        if page_url.startswith('/'):
            page_url = f"{baselink}{page_url}"
        if not page_url.startswith('/') and not page_url.startswith('http'):
            page_url = f"{baselink}/{page_url}"
        
        try:
            page = requests.get(page_url, verify=False)
            if page.status_code != 200:
                print(f"Dead link: {page_url} has status code {page.status_code}")
        except requests.exceptions.HTTPError as err:
            print(f"Page link error for {page_url}")
    input()
