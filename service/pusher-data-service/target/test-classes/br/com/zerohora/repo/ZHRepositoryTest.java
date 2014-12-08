package br.com.zerohora.repo;


import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

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
public class ZHRepositoryTest extends ZHRepository {
	
	private ZHRepository repo = this;
	private JSONArray arrayItems;
	private JSONObject item;
	private final Integer idValue = 4654257;
	private final String titleValue = "Luiz Zini Pires: Vasco devolverá Kleber e quer ficar com Maxi Rodríguez";
	private final String tagValue = "Opinião";
	private final String dateValue = "2014-12-01:11:01:23";
	private final String thumbValue = "http://www.clicrbs.com.br/rbs/image/17081694.jpg?w=230";
	private final String linkDeskValue = "http://zh.clicrbs.com.br/rs/esportes/gremio/noticia/2014/12/luiz-zini-pires-vasco-devolvera-kleber-e-quer-ficar-com-maxi-rodriguez-4654257.html";
	private final String linkMobilValue = "http://m.zerohora.com.br/295/gremio/4654257/luiz-zini-pires-vasco-devolvera-kleber-e-quer-ficar-com-maxi-rodriguez";
	
	@Before
	public void setUp() throws Exception {		
		buildFakeRepo();
		if (this.arrayItems == null) {
			buildArrayAndItem(repo.getNews());
		}
	}
	
	public void buildArrayAndItem(JSONArray array) {
		arrayItems = array;
		item = arrayItems.getJSONObject(0);
	}
	
	private void buildFakeRepo() {
		repo = new ZHRepository(); // repo spy	
		
		StringBuilder fakeResponseBuilder = new StringBuilder();
		
		fakeResponseBuilder.append("{\"news\": [");
		fakeResponseBuilder.append("{\"id\": \""+idValue.toString()+"\",");
		fakeResponseBuilder.append("\"title\": \""+titleValue+"\",");
		fakeResponseBuilder.append(" \"tag\": \""+tagValue+"\",");
		fakeResponseBuilder.append("\"date\": \""+dateValue+"\",");
		fakeResponseBuilder.append("\"thumb\": \""+thumbValue+"\",");

		fakeResponseBuilder.append("\"link-desktop\": \""+linkDeskValue+"\",");
		fakeResponseBuilder.append("\"link-mobile\": \""+linkMobilValue+"\"");
		fakeResponseBuilder.append("}]}");
		
		repo.urlContent = fakeResponseBuilder.toString();
	}

	@Test
	public void arrayItemSizeMustBe1() {
		Assert.assertEquals("Array size must be equals fake object size (1).",
							1,arrayItems.size());
	}
	
	@Test
	public void arrayItemIdMustBeEqualsDefinedObject() {
		Assert.assertEquals("Item id must be equals fake object value.",
							 idValue,new Integer(item.getString("id")));	
	}
	
	@Test
	public void  arrayItemTitleMustBeEqualsDefinedObject()  {
		Assert.assertEquals("Item title must be equals fake object value.",
							 titleValue,item.getString("title"));
	}
	
	@Test
	public void arrayItemTagMustBeEqualsDefinedObject()  {
		Assert.assertEquals("Item tag must be equals fake object value.",
				             tagValue,item.getString("tag"));
	}
	
	@Test
	public void arrayItemDateMustBeEqualsDefinedObject() {
		Assert.assertEquals("Item date must be equals fake object value.",
							 dateValue,item.getString("date"));
	}
	
	@Test
	public void arrayItemThumbMustBeEqualsDefinedObject() {
		Assert.assertEquals("Item thumb must be equals fake object value.",
							 thumbValue,item.getString("thumb"));
	}
	
	@Test
	public void arrayItemLinkDesktopMustBeEqualsDefinedObject() {
		Assert.assertEquals("Item link desk must be equals fake object value.",
							 linkDeskValue,item.getString("link-desktop"));
	}
	
	@Test
	public void  arrayItemLinkMobileMustBeEqualsDefinedObject() {
		Assert.assertEquals("Item link mobile must be equals fake object value.",
							 linkMobilValue,item.getString("link-mobile"));
	}
	
	@Test
	public void assertAllFieldTypesOfInternalArray() {
		arrayItemSizeMustBe1();
		arrayItemIdMustBeEqualsDefinedObject();
		arrayItemTitleMustBeEqualsDefinedObject();
		arrayItemTagMustBeEqualsDefinedObject();
		arrayItemDateMustBeEqualsDefinedObject();
		arrayItemThumbMustBeEqualsDefinedObject();
		arrayItemLinkDesktopMustBeEqualsDefinedObject();
		arrayItemLinkMobileMustBeEqualsDefinedObject();
		
		Assert.assertEquals(1, 2); 
	}
	
	private static ZHRepositoryTest thisTest = null;
	
	/**
	 * Obtain a instance of internal fake repo used 
	 * on this test case class - singleton
	 * @return Fake repository
	 */
	public static ZHRepositoryTest getInstance( ) {
		try {
			 new ZHRepositoryTest();
			
			if (thisTest == null) {
				thisTest = new ZHRepositoryTest();
			}
			
			thisTest.setUp();
			return thisTest;
		} catch (Exception e) {e.printStackTrace();}
		return null;
	}
	
	public void setArrayItems(JSONArray arrayItems) {
		this.arrayItems = arrayItems;
	}

	public ZHRepository getRepo() {
		return repo;
	}

	public void setRepo(ZHRepository repo) {
		this.repo = repo;
	}
}
