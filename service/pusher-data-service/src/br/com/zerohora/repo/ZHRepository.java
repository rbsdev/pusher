package br.com.zerohora.repo;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.Charset;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;

/**
 * Copyright 2014 Zero Hora
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * @author isaias_alves <isaiasa@gmail.com>
 */
public class ZHRepository {

	protected static final String 
						ZH_PUBLIC_NEWS_LIST = "http://www.clicrbs.com.br/mobile/jsp/default_json.jsp?action=ultimasnoticias"
								+ "&sectid={id}&site=zerohora"
								+ "&highlight={hl}&originalthumb=true&device=false"
								+ "&size={size}&includelink=true";

	protected String serviceURL;
	protected String urlContent;
	
	/** Type of Teams */
	public enum Teams {
		
		GREMIO("gremio", 295l),INTER("inter",296l);
		
		private Long id;
		private String teamName;
		
		private Teams( final String teamName, final Long id ) {
			
			this.id = id;
			this.teamName = teamName;
			
		}

		public Long getId() {
			return id;
		}
		public String getTeamName() {
			return teamName;
		}
	}

	public ZHRepository( final Teams team, final Integer size, final Integer hl ) {
		this.buildServiceUrlByTeam(team, size, hl);
		this.buildUrlContent(this.serviceURL);
	}
	
	public ZHRepository() {}
	
	public JSONArray getNews() {
		return ((JSONObject)JSONSerializer.toJSON(urlContent)).getJSONArray("news");  
	}

	protected void buildUrlContent(final String url) {
		try {
			final InputStream is = new URL(url).openStream();
		    try {
		      final BufferedReader rd = new BufferedReader(new InputStreamReader(is, Charset.forName("UTF-8")));
		      this.urlContent = readAll(rd);
		    } finally {
		      is.close();
		    }
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	protected void buildServiceUrlByTeam(final Teams team,final Integer size, final Integer hl ) {
		
		this.serviceURL = ZH_PUBLIC_NEWS_LIST.replaceAll("\\{id}",team.getId().toString())
				 							 .replaceAll("\\{hl}",hl.toString())
				 							 .replaceAll("\\{size}", size.toString());
	}
	
	private static String readAll(Reader rd) throws IOException {
	    StringBuilder sb = new StringBuilder();
	    int cp;
	    while ((cp = rd.read()) != -1) {
	      sb.append((char) cp);
	    }
	    return sb.toString();
	  }
}
