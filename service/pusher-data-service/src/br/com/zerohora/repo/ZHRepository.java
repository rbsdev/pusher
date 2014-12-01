package br.com.zerohora.repo;

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
	
	private static final String ZH_PUBLIC_NEWS_LIST = "http://www.clicrbs.com.br/mobile/jsp/default_json.jsp?action=ultimasnoticias&sectid=200&site=zerohora&highlight=0&originalthumb=true&device=false&size=20&includelink=true";
	
	/**
	 * ZH public list services repository access
	 */
	public ZHRepository() {
		//ZH_PUBLIC_NEWS_LIST.replaceAll("\\{X}", id))
	}
	
	/**
	 * Team t
	 */
	private enum Teams {
		
		GREMIO("gremio", 295l),INTER("inter",296l);
		
		private Long id;
		private String teamName;
		
		private Teams( final String teamName, final Long id ) {
			
		}

		public Long getId() {
			return id;
		}

		public String getTeamName() {
			return teamName;
		}
	}
	
	
}
